import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListner } from '../utils/firebase/firebase.util';


export const UserContext = createContext ({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner((user) => {
        setCurrentUser(user);
    });

        return unsubscribe;

    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};