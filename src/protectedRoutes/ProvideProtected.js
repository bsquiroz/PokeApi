import React, { createContext, useState, useContext } from "react";
import pokeContext from "../context/pokeContext";
const protectedRoute = createContext();

const useProvideProtected = () => {
    const contextGlobal = useContext(pokeContext);
    const { Logout, name } = contextGlobal;
    const [isAllowed, setIsAllowed] = useState(false);

    const setAllowed = () => {
        setIsAllowed(!isAllowed);
        if (name) {
            Logout();
        }
    };

    return {
        isAllowed,
        setAllowed,
    };
};

export const ProvideProtected = ({ children }) => {
    const protect = useProvideProtected();

    return (
        <protectedRoute.Provider value={protect}>
            {children}
        </protectedRoute.Provider>
    );
};

export const useProtectedRoute = () => useContext(protectedRoute);
