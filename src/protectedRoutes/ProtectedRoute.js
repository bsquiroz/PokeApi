import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useProtectedRoute } from "./ProvideProtected";

const ProtectedRoute = ({ children, ...props }) => {
    const { isAllowed } = useProtectedRoute();
    return (
        <Route
            {...props}
            render={() => (isAllowed ? children : <Redirect to="/" />)}
        />
    );
};

export default ProtectedRoute;
