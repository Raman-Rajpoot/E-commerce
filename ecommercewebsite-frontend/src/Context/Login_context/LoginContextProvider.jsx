import React, { useState, useEffect } from 'react';
import LoginContext from './LoginContext';

function LoginContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                setUser(null);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
 
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
   
    return (
        <LoginContext.Provider value={{ user, setUser: saveUser, clearUser }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;
