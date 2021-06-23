//aqui es donde utilizare mi logica y los types
import {
    SAVE_SEARCH,
    GET_NAME,
    LOGOUT,
    CHANGE_TOTAL_FOR_PAGES,
    DARK_MODE,
    ERROR,
} from "../types";

const Reducer = (state, action) => {
    switch (action.type) {
        case SAVE_SEARCH:
            return {
                ...state,
                search: action.payload,
            };

        case GET_NAME:
            return {
                ...state,
                name: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                name: action.payload,
                search: {},
            };

        case CHANGE_TOTAL_FOR_PAGES:
            return {
                ...state,
                totalForPag: action.payload,
            };

        case DARK_MODE:
            return {
                ...state,
                dark: !state.dark,
            };

        case ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default Reducer;
