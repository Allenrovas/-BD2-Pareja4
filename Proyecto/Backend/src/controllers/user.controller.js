import neo4jConnection from "../db/neoConnection.js";
import neo4jConnection2 from "../db/neoConnection2.js";
import neo4jConnection3 from "../db/neoConnection3.js";
import PhotoUser from "../db/models/photo.model.js";
import Pdf from "../db/models/pdf.model.js";

export const getUser = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const user = isUser.records[0].get('user').properties;

        delete user.password;

        const names = {
            name1: "",
            name2: "",
            lastname1: "",
            lastname2: ""
        }

        const aux = user.name.split(" ");
        if (aux.length === 1) {
            names.name1 = aux[0];
        } else if (aux.length === 2) {
            names.name1 = aux[0];
            names.lastname1 = aux[1];
        } else if (aux.length === 3) {
            names.name1 = aux[0];
            names.name2 = aux[1];
            names.lastname1 = aux[2];
        } else if (aux.length === 4) {
            names.name1 = aux[0];
            names.name2 = aux[1];
            names.lastname1 = aux[2];
            names.lastname2 = aux[3];
        }

        const aux2 = {
            ...user,
            ...names
        }

        res.response(aux2, 'User found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const addFriend = async (req, res) => {

    try {
        const { email, friendEmail } = req.body;

        if (!email || !friendEmail) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const isFriend = await neo4jConnection.run(
            `MATCH (user:User {email: $friendEmail}) RETURN user`,
            { friendEmail }
        );

        if (isFriend.records.length === 0) {
            return res.response(null, 'Friend not found', 404);
        }

        const isFriendOf = await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[r:IS_FRIEND_OF]->(friend:User {email: $friendEmail}) RETURN r`,
            { email, friendEmail }
        );

        if (isFriendOf.records.length > 0) {
            return res.response(null, 'Friend already added', 400);
        }

        await neo4jConnection.run(
            `MATCH (user:User {email: $email}), (friend:User {email: $friendEmail}) CREATE (user)-[:IS_FRIEND_OF]->(friend), (friend)-[:IS_FRIEND_OF]->(user)`,
            { email, friendEmail }
        );

        // crear nodo de mensajes y agregarle a los dos usuarios
        await neo4jConnection.run(
            `MATCH (user:User {email: $email}), (friend:User {email: $friendEmail}) CREATE (user)-[:HAS_MESSAGES]->(chat:Chat { User1: $email, User2: $friendEmail, Type: "Chat", Messages: ""}), (friend)-[:HAS_MESSAGES]->(chat)`,
            { email, friendEmail }
        );

        res.response(null, 'Friend added', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getFriends = async (req, res) => {
    
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const friends = await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[r:IS_FRIEND_OF]->(friend:User) RETURN friend`,
            { email }
        );

        const friendsList = friends.records.map(friend => {
            const aux = friend.get('friend').properties;
            delete aux.password;
            return aux;
        });

        // agregarle su foto de perfil a cada amigo
        for (let i = 0; i < friendsList.length; i++) {
            const friend = friendsList[i];
            const photo = await PhotoUser.findOne({ user: friend.email });
            if (photo) {
                friend.extPhoto = photo.name.split('.')[1];
                friend.photo = photo.content.toString('base64');
            }
        }

        res.response(friendsList, 'Friends found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const deleteFriend = async (req, res) => {

    try {
        const { email, friendEmail } = req.body;

        console.log(email, friendEmail);

        if (!email || !friendEmail) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const isFriend = await neo4jConnection.run(
            `MATCH (user:User {email: $friendEmail}) RETURN user`,
            { friendEmail }
        );

        if (isFriend.records.length === 0) {
            return res.response(null, 'Friend not found', 404);
        }

        const isFriendOf = await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[r:IS_FRIEND_OF]->(friend:User {email: $friendEmail}) RETURN r`,
            { email, friendEmail }
        );

        if (isFriendOf.records.length === 0) {
            return res.response(null, 'Friend not added', 400);
        }

        await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[r:IS_FRIEND_OF]->(friend:User {email: $friendEmail}), (friend)-[r2:IS_FRIEND_OF]->(user) DELETE r, r2`,
            { email, friendEmail }
        );

        res.response(null, 'Friend deleted', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};


export const getFriendsInCommon = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const friends = await neo4jConnection.run(
            `MATCH (user:User {email: $email})-[:IS_FRIEND_OF]->(friend:User)-[:IS_FRIEND_OF]->(friendOfFriend:User) WHERE NOT (user)-[:IS_FRIEND_OF]->(friendOfFriend) AND user <> friendOfFriend RETURN friendOfFriend`,
            { email }
        );

        const friendsList = friends.records.map(friend => {
            const aux = friend.get('friendOfFriend').properties;
            delete aux.password;
            return aux;
        });

        // agregarle su foto de perfil a cada amigo
        for (let i = 0; i < friendsList.length; i++) {
            const friend = friendsList[i];
            const photo = await PhotoUser.findOne({ user: friend.email });
            if (photo) {
                friend.extPhoto = photo.name.split('.')[1];
                friend.photo = photo.content.toString('base64');
            }
        }

        res.response(friendsList, 'Friends found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getFriendsBySpecialty = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection2.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        // const friends = await neo4jConnection.run(
        //     `MATCH (user:User {email: $email})-[:IS_FRIEND_OF]->(friend:User)-[:IS_FRIEND_OF]->(friendOfFriend:User) WHERE NOT (user)-[:IS_FRIEND_OF]->(friendOfFriend) AND user <> friendOfFriend AND friendOfFriend.specialty = user.specialty RETURN friendOfFriend`,
        //     { email }
        // );

//         MATCH (user:User {email: 'a@gmail.com'})
        // MATCH (otherUser:User)
        // WHERE otherUser <> user AND otherUser.specialty = user.specialty
        // AND NOT (user)-[:IS_FRIEND_OF]->(otherUser)
        // RETURN DISTINCT otherUser;

        const friends = await neo4jConnection2.run(
            `MATCH (user:User {email: $email}) MATCH (otherUser:User) WHERE otherUser <> user AND otherUser.specialty = user.specialty AND NOT (user)-[:IS_FRIEND_OF]->(otherUser) RETURN DISTINCT otherUser`,
            { email }
        );


        const friendsList = friends.records.map(friend => {
            const aux = friend.get('otherUser').properties;
            delete aux.password;
            return aux;
        });

        // agregarle su foto de perfil a cada amigo
        for (let i = 0; i < friendsList.length; i++) {
            const friend = friendsList[i];
            const photo = await PhotoUser.findOne({ user: friend.email });
            if (photo) {
                friend.extPhoto = photo.name.split('.')[1];
                friend.photo = photo.content.toString('base64');
            }
        }

        res.response(friendsList, 'Friends found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const updateProfile = async (req, res) => {

    try {
        const { username, webSite } = req.body;
        const { email } = req.params;

        if (!username || !webSite || !email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        await neo4jConnection.run(
            `MATCH (user:User {email: $email}) SET user.username = $username, user.webSite = $webSite`,
            { email, username, webSite }
        );

        res.response(null, 'Profile updated', 200);
        }
    catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const uploadPdf = async (req, res) => {

    try{
        
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }
        
        const isUser = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        console.log(req.file);
        
        const { buffer, originalname } = req.file;
        // const fileExtension = originalname.split('.').pop();

        await Pdf.create({ name: originalname, content: buffer, user: email });

        res.response(null, 'Pdf uploaded', 200);
    }catch(error){
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getFiles = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const files = await Pdf.find({ user: email });

        res.response(files, 'Files found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const getNoFriends = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection3.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const usersNoFriends = await neo4jConnection3.run(
            `MATCH (user:User {email: $email}) MATCH (otherUser:User) WHERE otherUser <> user AND NOT (user)-[:IS_FRIEND_OF]->(otherUser) RETURN otherUser`,
            { email }
        );

        const usersNoFriendsList = usersNoFriends.records.map(user => {
            const aux = user.get('otherUser').properties;
            delete aux.password;
            return aux;
        });

        // agregarle su foto de perfil a cada amigo

        for (let i = 0; i < usersNoFriendsList.length; i++) {
            const user = usersNoFriendsList[i];
            const photo = await PhotoUser.findOne({ user: user.email });
            if (photo) {
                user.extPhoto = photo.name.split('.')[1];
                user.photo = photo.content.toString('base64');
            }
        }

        res.response(usersNoFriendsList, 'Users found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};

export const getFriends2 = async (req, res) => {
    
    try {
        const { email } = req.params;

        if (!email) {
            return res.response(null, 'Missing fields', 400);
        }

        const isUser = await neo4jConnection3.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isUser.records.length === 0) {
            return res.response(null, 'User not found', 404);
        }

        const friends = await neo4jConnection3.run(
            `MATCH (user:User {email: $email})-[r:IS_FRIEND_OF]->(friend:User) RETURN friend`,
            { email }
        );

        const friendsList = friends.records.map(friend => {
            const aux = friend.get('friend').properties;
            delete aux.password;
            return aux;
        });

        // agregarle su foto de perfil a cada amigo
        for (let i = 0; i < friendsList.length; i++) {
            const friend = friendsList[i];
            const photo = await PhotoUser.findOne({ user: friend.email });
            if (photo) {
                friend.extPhoto = photo.name.split('.')[1];
                friend.photo = photo.content.toString('base64');
            }
        }

        res.response(friendsList, 'Friends found', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};