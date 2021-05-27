import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useProtectedRoute } from "../protectedRoutes/ProvideProtected";
import pokeContext from "../context/pokeContext";
import "./styles/home.css";

const Home = () => {
    //funcion que se necarga de las rutas protegidas.
    const { setAllowed } = useProtectedRoute();

    //aqui estarigo el estado global que necesito
    const contextGlobal = useContext(pokeContext);
    const { getName, dark } = contextGlobal;

    const [name, setName] = useState("");

    const handleInput = (e) => {
        setName(e.target.value);
    };

    const exportValues = () => {
        getName(name);
        setAllowed();
    };

    const darkTrue = {
        background: "#fff",
        color: "#000",
    };

    const darkFalse = {
        background: "#000",
        color: "#fff",
    };

    return (
        <div className="Home" style={dark ? darkTrue : darkFalse}>
            <h1>Ingresa por favor tu nombre de entrenador</h1>
            <input
                type="text"
                onChange={handleInput}
                value={name}
                name="name"
                placeholder="Ej: Bsquiroz"
            />
            {name && (
                <Link to={"/pokedex"}>
                    <button
                        className="btn ingresar"
                        onClick={() => exportValues()}
                    >
                        Ingresar
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Home;
