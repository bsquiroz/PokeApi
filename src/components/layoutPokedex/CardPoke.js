import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../helpers/Colors";

const CardPoke = ({ pokemon }) => {
    const pokeName = pokemon.name;
    const id = pokemon.id;
    // const img = pokemon.sprites.other.official-artwork.front_default;
    const img =
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.front_default;
    // const img = pokemon.sprites.front_default;
    const types = pokemon.types;
    const stats = pokemon.stats;
    const statsFilter = stats.filter(
        (e) =>
            e.stat.pokeName !== "special-attack" &&
            e.stat.pokeName !== "special-defense"
    );
    const aux = pokemon.types[0].type.name;
    const color = colors[aux];

    return (
        <div className="card-body" style={{ border: `3px solid ${color}` }}>
            <h4 style={{ borderBottom: `3px solid ${color}` }}>{pokeName}</h4>
            <Link
                to={`/pokedex/${id}`}
                className="enlace"
                style={{ color: ` ${color}` }}
            >
                <b># {id}</b>
            </Link>
            <div style={{ background: color }} className="box-img">
                <img src={img} alt={pokeName} />
            </div>
            <div className="types" style={{ background: `${color}` }}>
                {types.map((e) => (
                    <p key={e.type.name} style={{ color: "#000" }}>
                        {e.type.name}
                    </p>
                ))}
            </div>
            <div className="stats">
                {statsFilter.map((e) => (
                    <div key={e.stat.name} className="stats-flex">
                        <p className="stats-name">
                            <b>{e.stat.name}</b>: <span> </span>
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
        </div>
    );
};

export default CardPoke;
