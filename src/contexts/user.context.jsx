import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListner, signOutUser } from '../utils/firebase/firebase.util';

export const UserContext = createContext ({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    signOutUser();

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner((user) => {
            console.log(user);
        });

        return unsubscribe;

    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}