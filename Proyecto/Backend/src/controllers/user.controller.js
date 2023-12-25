import neo4jConnection from "../db/neoConnection.js";

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
            `MATCH (user:User {email: $email}), (friend:User {email: $friendEmail}) CREATE (user)-[:IS_FRIEND_OF]->(friend)`,
            { email, friendEmail }
        );

        res.response(null, 'Friend added', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
};