//aqui estara mi estado global

import React, { useReducer } from "react";
import pokeReducer from "./pokeReducer";
import pokeContext from "./pokeContext";

import {
    SAVE_SEARCH,
    GET_NAME,
    LOGOUT,
    CHANGE_TOTAL_FOR_PAGES,
    DARK_MODE,
    ERROR,
} from "../types";

const PokeState = (props) => {
    const initialState = {
        search: {},
        name: null,
        totalForPag: 4,
        dark: false,
        error: false,
    };

    //creo mi reducer
    const [state, dispatch] = useReducer(pokeReducer, initialState);

    const saveSearch = (data) => {
        dispatch({
            type: SAVE_SEARCH,
            payload: data,
        });
    };

    const getName = (name) => {
        dispatch({
            type: GET_NAME,
            payload: name,
        });
    };

    const Logout = () => {
        dispatch({
            type: LOGOUT,
            payload: null,
        });
    };

    const ChangeTotalForPages = (total) => {
        dispatch({
            type: CHANGE_TOTAL_FOR_PAGES,
            payload: total,
        });
    };

    const darkMode = () => {
        dispatch({
            type: DARK_MODE,
        });
    };

    const saveError = (data) => {
        dispatch({
            type: ERROR,
            payload: data,
        });
    };

    return (
        <pokeContext.Provider
            value={{
                search: state.search,
                name: state.name,
                totalForPag: state.totalForPag,
                dark: state.dark,
                error: state.error,
                saveSearch,
                Logout,
                getName,
                ChangeTotalForPages,
                darkMode,
                saveError,
            }}
        >
            {props.children}
        </pokeContext.Provider>
    );
};

export default PokeState;
