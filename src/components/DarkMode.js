import React, { useContext, useState } from "react";
import "./styles/darkMode.css";
import pokeContext from "../context/pokeContext";

const DarkMode = () => {
    //extraigo estado global
    const ContextGlobal = useContext(pokeContext);
    const { darkMode } = ContextGlobal;
    const [mode, setMode] = useState(true);

    const handleDarkMode = () => {
        darkMode();
        setMode(!mode);
    };
    return (
        <button className="darkMode" onClick={() => handleDarkMode()}>
            {mode ? <span>☀️</span> : <span>🌑</span>}
        </button>
    );
};

export default DarkMode;
