import React from "react";
import { Link } from "react-router-dom";

const NoFound = () => {
    return (
        <div>
            <h1>Lo sentimos esta pagina no se encuentrar 404</h1>
            <Link to={"/"}>Volver a pagina principal</Link>
        </div>
    );
};

export default NoFound;
