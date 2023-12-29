import neo4jConnection from "../db/neoConnection2.js";
import neo4jConnection3 from "../db/neoConnection3.js";

export const createChat = async (req, res) => {
    try {
      const { email, friendEmail, message } = req.body;

  
      if (!email || !message) {
        return res.response(null, 'Missing fields', 400);
      }
  
        const isRegistered = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );
        const isRegisteredFriend = await neo4jConnection.run(
            `MATCH (user:User {email: $friendEmail}) RETURN user`,
            { friendEmail }
        );


        if (isRegistered.records.length === 0 || isRegisteredFriend.records.length === 0) {
            return res.response(null, 'User not registered', 400);
        }

        const currentDate = new Date();
        const date = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Ajustar el mes para que sea de 1 a 12
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const dateAndTime = `${date}/${month}/${year} ${hour}:${minutes}`;

        const chatString = JSON.stringify({
            message,
            date: dateAndTime,
            author: email
        });

        await neo4jConnection.run(
            `MATCH (user:User {email: $email}), (friend:User {email: $friendEmail})
            MERGE (user)-[:HAS_MESSAGES]->(chat:Chat { Type: "Chat" })<-[:HAS_MESSAGES]-(friend)
            SET chat.Messages  = coalesce(chat.Messages , '') + $chatString
            RETURN user, friend, chat`,
            { email, friendEmail, chatString }
        );

        res.response(null, 'Chat created', 200);
    }catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}


export const getMessages = async (req, res) => {
    try {
        const { email, friendEmail } = req.params;

        console.log(req.params);

        if (!email || !friendEmail) {
            return res.response(null, 'Missing fields', 400);
        }

        const isRegistered = await neo4jConnection3.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );
        const isRegisteredFriend = await neo4jConnection3.run(
            `MATCH (user:User {email: $friendEmail}) RETURN user`,
            { friendEmail }
        );

        if (isRegistered.records.length === 0 || isRegisteredFriend.records.length === 0) {
            return res.response(null, 'User not registered', 400);
        }

        const messages = await neo4jConnection3.run(
            `MATCH (user:User {email: $email})-[r:HAS_MESSAGES]->(chat:Chat)<-[r2:HAS_MESSAGES]-(friend:User {email: $friendEmail})
            RETURN chat.Messages`,
            { email, friendEmail }
        );
        
        if (messages.records.length === 0) {
            return res.response(null, 'No messages', 200);
        }

        //Parsear los mensajes a JSON

        messages.records[0].get('chat.Messages').forEach((message, index) => {
            messages.records[0].get('chat.Messages')[index] = JSON.parse(message);
        });

        // Ordenar los mensajes por fecha

        const sortedConversations = messages.records[0].get('chat.Messages').sort((a, b) => {
            return parseCustomDate(a.date) - parseCustomDate(b.date);
        });



        res.response(sortedConversations, 'Messages retrieved', 200);
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

