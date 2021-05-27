import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import pokeContext from "../../context/pokeContext";

const initialState = {
    nameOrId: "",
    type: "",
};

const Form = () => {
    //estado global de la app
    const contextGlobal = useContext(pokeContext);
    const { saveSearch, ChangeTotalForPages } = contextGlobal;

    const [radios, setRadios] = useState("0");
    const [values, setValues] = useState(initialState);
    const [types, setTypes] = useState("");

    useEffect(() => {
        const res = axios("https://pokeapi.co/api/v2/type");
        res.then((response) => setTypes(response.data.results));
    }, [types]);

    const handleRadios = (e) => {
        setRadios(e.target.value);
    };

    const handleInputs = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleForm = (e) => {
        e.preventDefault();
        if (radios === "0") {
            if (values.nameOrId.trim() === "") {
                alert("este campo es necesario");
                return;
            }
            values.option = radios;
            saveSearch(values);
        } else {
            values.option = radios;
            saveSearch(values);
        }
        setValues(initialState);
    };

    const handleTotalPokePag = (e) => {
        let number = Number(e.target.value);
        ChangeTotalForPages(number);
    };

    return (
        <form onSubmit={handleForm}>
            <div className="radios">
                {" "}
                <h3>Seleccione el tipo de busqueda</h3>
                <input
                    type="radio"
                    name="search"
                    value="0"
                    onChange={handleRadios}
                    defaultChecked
                />
                <label>Buscar por id o nombre</label>
                <br />
                <input
                    type="radio"
                    name="search"
                    value="1"
                    onChange={handleRadios}
                />
                <label>buscar por tipo</label>
            </div>
            {radios === "0" && (
                <div className="center-options">
                    <label>Ingresa el id o nombre del pokemon</label>
                    <input
                        type="text"
                        name="nameOrId"
                        value={values.nameOrId}
                        onChange={handleInputs}
                    />
                </div>
            )}
            {radios === "1" && (
                <>
                    <div className="center-options">
                        <label>Escoge el tipo de pokemon</label>
                        <select name="type" onChange={handleInputs}>
                            {types &&
                                types.map((type) => (
                                    <option key={type.name}>{type.name}</option>
                                ))}
                        </select>
                        <button className="buscar" type="submit">
                            Buscar
                        </button>
                    </div>
                    <div className="center-options">
                        <label>¿Cuantos pokemones deseas ver por pagina?</label>
                        <select onChange={handleTotalPokePag}>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </>
            )}
        </form>
    );
};

export default Form;
