import neo4jConnection from "../db/neoConnection2.js";
import PhotoUser from "../db/models/photo.model.js";

export const createPublication = async (req, res) => {
    try {
      const { email, publication } = req.body;
  
      if (!email || !publication) {
        return res.response(null, 'Missing fields', 400);
      }
  
      const isRegistered = await neo4jConnection.run(
        `MATCH (user:User {email: $email}) RETURN user`,
        { email }
      );
  
      if (isRegistered.records.length === 0) {
        return res.response(null, 'User not registered', 400);
      }
  
      const currentDate = new Date();
      const date = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Ajustar el mes para que sea de 1 a 12
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const dateAndTime = `${date}/${month}/${year} ${hour}:${minutes}`;
  
      const publicationString = JSON.stringify({
        publication,
        date: dateAndTime,
      });
  
      await neo4jConnection.run(
        `MATCH (user:User {email: $email})
         WITH user
         MATCH (posts:Posts)<-[:HAS]-(user)
         SET posts.Posts = coalesce(posts.Posts, '') + $publicationString
         RETURN user, posts`,
        { email, publicationString }
      );
  
      res.response(null, 'Publication created', 200);
    } catch (error) {
      console.log(error);
      res.response(null, error.message, 500);
    }
  };



export const getPublications = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
        return res.response(null, 'Missing fields', 400);
        }

        const isRegistered = await neo4jConnection.run(
        `MATCH (user:User {email: $email}) RETURN user`,
        { email }
        );

        if (isRegistered.records.length === 0) {
        return res.response(null, 'User not registered', 400);
        }

        const userResult = await neo4jConnection.run(
        `MATCH (user:User {email: $email})-[:HAS]->(userPosts:Posts) RETURN userPosts.Posts AS userPublications`,
        { email }
        );
  
        const userPublications = userResult.records.map((record) => record.get('userPublications'));

        const parsedPublications = userPublications[0].map((publication) => JSON.parse(publication));

        //Agregar el email del usuario a cada publicación

        parsedPublications.forEach((publication) => {
                publication.email = email;
            });

        // Obtener el nombre del usuario y agregarlo a cada publicación

        const nameResult = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user.name AS userName`,
            { email }
        );

        const userName = nameResult.records[0].get('userName');

        parsedPublications.forEach((publication) => {
            publication.name = userName;
        });

        // obtener la foto de perfil del usuario y agregarla a cada publicación

        const photoResult = await PhotoUser.findOne({ user: email });

        if (photoResult) {
            parsedPublications.forEach((publication) => {
                publication.extPhoto = photoResult.name.split('.')[1];
                publication.photo = photoResult.content.toString('base64');
            });
        }

        //Obtener publicaciones de los amigos con su email

        const friendsResult = await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[:IS_FRIEND_OF]-(friend:User)-[:HAS]->(friendPosts:Posts) RETURN DISTINCT friend.email AS friendEmail, friendPosts.Posts AS friendPublications`,
            { email }
        );


        const friendsData = friendsResult.records.map((record) => {
            const friendEmail = record.get('friendEmail');
            const friendPublications = record.get('friendPublications').map((publication) => {
              const parsedPublication = Array.isArray(publication) ? publication[0] : JSON.parse(publication);
              // Agregar el email del amigo a la publicación
              parsedPublication.email = friendEmail;
              return parsedPublication;
            });
            return friendPublications;
          });

          console.log(friendsData);

          // borrar los arrays vacios de friendsData
          friendsData.forEach((friendData, index) => {
            if (friendData.length === 0) {
              friendsData.splice(index, 1);
            }
          });
          


        // Obtener el nombre de los amigos y agregarlo a cada publicación
          if(friendsData.length > 0)
          {
            const friendsEmails = friendsData.map((friendData) => friendData[0].email);

          console.log(friendsEmails);

          // obtener los nombres de los usuarion que estan en el arreglo friendsEmails, no el amigo del usuario
          const friendsNamesResult = await neo4jConnection.run(
              `MATCH (user:User) WHERE user.email IN $friendsEmails RETURN user.email AS friendEmail, user.name AS friendName`,
              { friendsEmails }
          );

          const friendsNames = friendsNamesResult.records.map((record) => {
              const friendEmail = record.get('friendEmail');
              const friendName = record.get('friendName');
              return { friendEmail, friendName };
          });

          console.log(friendsNames);

          friendsData.forEach((friendData) => {
            const friendEmail = friendData[0].email;
            const friendNameObj = friendsNames.find((friend) => friend.friendEmail === friendEmail);

            
            // Verificar si se encontró el amigo antes de acceder a su nombre
            const friendName = friendNameObj ? friendNameObj.friendName : null;
          
            friendData.forEach((publication) => {
              // Corregir el nombre de la propiedad al asignar el nombre del amigo
              publication.name = friendName;
            });
          });

          // console.log(friendsData);

          // Obtener la foto de perfil de los amigos y agregarla a cada publicación

          const friendsPhotosResult = await PhotoUser.find({ user: { $in: friendsEmails } });

          const friendsPhotos = friendsPhotosResult.map((photoResult) => {
              const friendEmail = photoResult.user;
              const extPhoto = photoResult.name.split('.')[1];
              const photo = photoResult.content.toString('base64');
              return { friendEmail, extPhoto, photo };
          });


          friendsData.forEach((friendData) => {
              const friendEmail = friendData[0].email;
              const friendPhoto = friendsPhotos.find((friendPhoto) => friendPhoto.friendEmail === friendEmail);
              friendData.forEach((publication) => {
                publication.extPhoto = friendPhoto.extPhoto;
                publication.photo = friendPhoto.photo;
              });
          });
        }

        var allPublications = [];
        if (friendsData.length > 0) {
          allPublications = [...parsedPublications, ...friendsData.flat()];
        }else {
          allPublications = [...parsedPublications];
        }

        // console.log(allPublications);


        const sortedPublications = allPublications.sort((a, b) => {
            const dateA = parseCustomDate(a.date);
            const dateB = parseCustomDate(b.date);
            return dateB - dateA;
        });


        res.response(sortedPublications, 'Publications obtained', 200);

    }catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }  
}

function parseCustomDate(dateString) {
    const [day, month, yearAndTime] = dateString.split('/');
    const [year, time] = yearAndTime.split(' ');
    const [hour, minute] = time.split(':');

    return new Date(year, month - 1, day, hour, minute);
}