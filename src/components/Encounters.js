import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useProtectedRoute } from "../protectedRoutes/ProvideProtected";
import { colors } from "../helpers/Colors";
import pokeContext from "../context/pokeContext";
import "./styles/encounters.css";

const darkTrue = {
    background: "#fff",
    color: "#000",
};

const darkFalse = {
    background: "#000",
    color: "#fff",
};

const Encounters = () => {
    //Estado global
    const ContextGlobal = useContext(pokeContext);
    const { dark } = ContextGlobal;

    const [pokemon, setPokemon] = useState();
    const [url, setUrl] = useState();
    const [encounters, setEncounters] = useState();
    const pokeId = useParams().id;
    const { setAllowed } = useProtectedRoute();
    useEffect(() => {
        if (pokeId) {
            const res = axios(` https://pokeapi.co/api/v2/pokemon/${pokeId}`);
            res.then((response) => setPokemon(response.data));
        }
    }, [pokeId]);

    useEffect(() => {
        if (url) {
            const res = axios(url);
            res.then((response) => setEncounters(response.data));
        }
    }, [url]);

    useEffect(() => {
        if (pokemon) {
            setUrl(pokemon.location_area_encounters);
        }
    }, [pokemon]);

    if (encounters) {
        const arrayMap = encounters.map((e) => e.location_area.name);
        const arrayFilter = arrayMap.map((e) => e.split("-"));
        const arrayArea = arrayMap.map((e) => e.split("-").join(" "));
        const region = arrayFilter.map((e) => e[0]);
        const area = [];
        const data = [];

        for (let i = 0; i < region.length; i++) {
            area.push(arrayArea[i].replace(region[i], ""));
            data.push({
                region: region[i],
                area: area[i],
            });
        }

        const aux = pokemon.types[0].type.name;
        const color = colors[aux];
        const img =
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.front_default;

        return (
            <div className="container-enc" style={dark ? darkTrue : darkFalse}>
                <button className="btn salir" onClick={() => setAllowed()}>
                    Salir
                </button>
                <Link className="btn  volver" to={`/pokedex/${pokeId}`}>
                    Volver
                </Link>
                {encounters.length === 0 ? (
                    <h4>No hay nada que ver</h4>
                ) : (
                    pokemon && (
                        <div
                            className="encounters"
                            style={{ background: color, color: "#000" }}
                        >
                            <div>
                                <h1>
                                    {pokemon.name} <span># {pokemon.id}</span>
                                </h1>
                            </div>
                            <div className="content-img">
                                <img src={img} alt={pokemon.name} />
                            </div>
                            <div className="flex-enc">
                                {data.map((e, index) => (
                                    <div key={index} className="item">
                                        <p>
                                            <b>{index + 1}.</b>{" "}
                                            <strong>Region:</strong> {e.region}
                                        </p>
                                        <p>
                                            <strong>Area:</strong> {e.area}
                                        </p>{" "}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default Encounters;
