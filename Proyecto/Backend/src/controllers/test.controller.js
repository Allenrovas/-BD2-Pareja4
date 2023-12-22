import neoConnection from '../db/neoConnection.js';

export const ping = async (req, res) => {
    res.send({ message: "pong" });
};

export const pong = async (req, res) => {
    console.log(req.body);
};

export const getInfoConnection = async (req, res) => {
    
    try {
        
        const result = await neoConnection.run('MATCH (n:User) RETURN n');

        res.response(result.records, 'Users listed successfully', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }

};