import PokeState from "./context/pokeState";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import Encounters from "./components/Encounters";
import { ProvideProtected } from "./protectedRoutes/ProvideProtected";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import NoFound from "./components/NoFound";
import DarkMode from "./components/DarkMode";

function App() {
    return (
        <PokeState>
            <ProvideProtected>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <ProtectedRoute exact path="/pokedex">
                            <Pokedex />
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/pokedex/:id">
                            <Pokemon />
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/pokedex/:id/:name">
                            <Encounters />
                        </ProtectedRoute>
                        <Route exact path="*">
                            <NoFound />
                        </Route>
                    </Switch>
                </Router>
                <DarkMode />
            </ProvideProtected>
        </PokeState>
    );
}

export default App;
