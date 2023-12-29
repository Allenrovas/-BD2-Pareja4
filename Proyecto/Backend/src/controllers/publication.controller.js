import neo4jConnection from "../db/neoConnection2.js";

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

        //Obtener publicaciones de los amigos con su email

        const friendsResult = await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[:IS_FRIEND_OF]-(friend:User)-[:HAS]->(friendPosts:Posts) RETURN friend.email AS friendEmail, friendPosts.Posts AS friendPublications`,
            { email }
        );

        const friendsData = friendsResult.records.map((record) => {
            const friendEmail = record.get('friendEmail');
            const friendPublications = record.get('friendPublications').map((publication) => {
              const parsedPublication = JSON.parse(publication);
              // Agregar el email del amigo a la publicación
              parsedPublication.email = friendEmail;
              return parsedPublication;
            });
            return friendPublications;
          });

        var allPublications = [];
        if (friendsData.length > 0) {
          allPublications = [...parsedPublications, ...friendsData[0]];
        }else {
          allPublications = [...parsedPublications];
        }


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