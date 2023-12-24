import Photo from "../db/models/photo.model.js";
import neo4jConnection from "../db/neoConnection.js";
import { cifrarPassword } from "../config/constants.js";

export const signUp = async (req, res) => {
    
    try {
        const { name, username, email, age, specialty, webSite, password } = req.body;

        console.log(name, username, email, age, specialty, webSite, password);

        if (!name || !username || !email || !age || !specialty || !password) {
            return res.response(null, 'Missing fields', 400);
        }

        const isRegistered = await neo4jConnection.run(
            `MATCH (user:User {email: $email}) RETURN user`,
            { email }
        );

        if (isRegistered.records.length > 0) {
            return res.response(null, 'User already registered', 400);
        }

        const passwordCifrado = await cifrarPassword(password);

        await neo4jConnection.run(
            `CREATE (user:User {name: $username, username: $username, email: $email, age: $age, specialty: $specialty, webSite: $webSite, password: $passwordCifrado})`,
            { name, username, email, age, specialty, webSite, passwordCifrado }
        );

        console.log(req.file);

        const { buffer, originalname } = req.file;
        // const fileExtension = originalname.split('.').pop();

        await Photo.create({ name: originalname, content: buffer, user: email });

        res.response(null, 'User created', 200);
        

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const signInPassword = async (req, res) => {
    
    try{
        const { email, password } = req.body;

        

        
    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}