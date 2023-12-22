
export const signUp = async (req, res) => {
    
    try {
        const { name, lastName, phone, email, birthDay, password } = req.body;
        

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