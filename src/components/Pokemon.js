import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useProtectedRoute } from "../protectedRoutes/ProvideProtected";
import { colors } from "../helpers/Colors";
import pokeContext from "../context/pokeContext";
import { holaMundo } from "../helpers/Types";
import "./styles/pokemon.css";

const darkTrue = {
    background: "#fff",
    color: "#000",
};

const darkFalse = {
    background: "#000",
    color: "#fff",
};

const Pokemon = () => {
    //estado global
    const ContextGlobal = useContext(pokeContext);
    const { dark } = ContextGlobal;

    const id = useParams().id;
    const { setAllowed } = useProtectedRoute();
    const [poke, setPoke] = useState();

    useEffect(() => {
        const res = axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        res.then((response) => setPoke(response.data));
    }, [id]);

    if (poke) {
        const height = poke.height / 10;
        const weight = poke.weight / 10;
        const order = poke.order;
        const types = poke.types;
        const stats = poke.stats;
        const img =
            poke.sprites.other.dream_world.front_default ||
            poke.sprites.front_default;
        const statsFilter = stats.filter(
            (e) =>
                e.stat.name !== "special-attack" &&
                e.stat.name !== "special-defense"
        );
        const skill = poke.abilities;
        const moves = poke.moves;

        const aux = types[0].type.name;
        const color = colors[aux];
        return (
            <div className="container-poke" style={dark ? darkTrue : darkFalse}>
                {poke && (
                    <>
                        <Link to={`/pokedex`}>
                            <button className="btn volver">Volver</button>
                        </Link>
                        <button
                            className="btn salir"
                            onClick={() => setAllowed()}
                        >
                            Salir
                        </button>
                        <div>
                            <Link
                                to={`/pokedex/${id}/${poke.name}`}
                                className="header"
                                style={{ color: color }}
                            >
                                <h1>{poke.name}</h1>
                                <p>{id}</p>
                            </Link>
                        </div>

                        <div style={{ background: color }} className="pokemon">
                            <div className="img">
                                <img src={img} alt={id} />
                            </div>
                            <div className="stats" style={{ color: "#000" }}>
                                <div>
                                    <p>
                                        <b>height</b>: {height} M
                                    </p>
                                    <p>
                                        <b>weight</b>: {weight} Kg
                                    </p>
                                    <p>
                                        <b>order</b>: #{order}{" "}
                                    </p>
                                </div>
                                <div>
                                    {types.map((e) => (
                                        <div className="type" key={e.type.name}>
                                            <img
                                                src={holaMundo(e.type.name)}
                                                alt={e.type.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {statsFilter.map((e) => (
                                        <div key={e.stat.name}>
                                            <p className="stats-name">
                                                <b>{e.stat.name}</b>:{" "}
                                                <span> </span>
                                                <span>{e.base_stat}</span>
                                            </p>
                                            <span>
                                                <progress
                                                    value={e.base_stat}
                                                    min="0"
                                                    max="160"
                                                ></progress>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4>Skill</h4>
                                    {skill.map((e) => (
                                        <p key={e.ability.name}>
                                            {e.ability.name}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="moves">
                            <h2>Moves</h2>
                            <div className="row">
                                {moves.map((e, i) => (
                                    <span
                                        style={{ border: `${color} 1px solid` }}
                                        className="col"
                                        key={e.move.name}
                                    >
                                        <b>{i + 1}</b>. {e.move.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default Pokemon;
