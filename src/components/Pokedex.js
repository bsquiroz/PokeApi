import React, { useContext, useEffect, useState } from "react";
import { useProtectedRoute } from "../protectedRoutes/ProvideProtected";
import pokeContext from "../context/pokeContext";
import Form from "./layoutPokedex/Form";
import axios from "axios";
import CardPoke from "./layoutPokedex/CardPoke";
import Pagination from "./pag/Pagination";
import "./styles/pokedex.css";

const Pokedex = () => {
    //estade global
    const contextGlobal = useContext(pokeContext);
    const { search, name, totalForPag, dark, error, saveError } = contextGlobal;
    const { nameOrId, type, option } = search;

    //funcion para desloguearme
    const { setAllowed } = useProtectedRoute();

    //estado que guarda los pokemones
    const [pokemons, setpokemons] = useState(null);
    const [pokemon, setpokemon] = useState(null);

    useEffect(() => {
        if (search.option) {
            //bases de las urls
            const urlNameId = "https://pokeapi.co/api/v2/pokemon";
            const urlType = "https://pokeapi.co/api/v2/type";

            //evalua la option que trae search ("0" o "1")
            if (option === "0") {
                const getPokemon = async () => {
                    try {
                        const response = await axios(
                            `${urlNameId}/${nameOrId}`
                        );
                        setpokemon(response.data);
                        setpokemons(null);
                        saveError(false);
                    } catch (error) {
                        saveError(true);
                        setpokemons(null);
                        setpokemon(null);
                    }
                };
                getPokemon();
            } else {
                const getPokemons = async () => {
                    try {
                        const response = await axios(`${urlType}/${type}`);
                        setpokemons(response.data.pokemon);
                        setpokemon(null);
                        saveError(false);
                    } catch (error) {
                        saveError(true);
                        setpokemons(null);
                        setpokemon(null);
                    }
                };
                getPokemons();
            }
        }
        //eslint-disable-next-line
    }, [search.option, option, type, nameOrId]);

    const darkTrue = {
        background: "#fff",
        color: "#000",
    };

    const darkFalse = {
        background: "#000",
        color: "#fff",
    };

    return (
        <div className="pokedex" style={dark ? darkTrue : darkFalse}>
            <div className="pokedex__content-text">
                <div className="title">
                    <h1>Hola entrenador, {name}</h1>
                    <button className="btn salir" onClick={() => setAllowed()}>
                        Salir
                    </button>
                </div>
                <Form />
            </div>
            {error ? (
                <h2 className="error">
                    Ocurrio un error mientras se consultaba la API <br /> Por
                    favor intenta nuevamnete{" "}
                </h2>
            ) : pokemon ? (
                <CardPoke pokemon={pokemon} />
            ) : pokemons ? (
                <Pagination array={pokemons} totalForPag={totalForPag} />
            ) : null}
        </div>
    );
};

export default Pokedex;
