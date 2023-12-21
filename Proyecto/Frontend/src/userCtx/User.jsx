import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('data_user'));
    console.log(localStorage.getItem('data_user'));
    let datos = false;
    console.log(user);
    if (user) {
        datos = true;
    }
    const [logged, setLogged] = useState(datos);

    return (
        <UserContext.Provider value={{ logged, setLogged }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;

export const useUser = () => useContext(UserContext);