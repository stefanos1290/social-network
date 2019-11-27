import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "./components/welcome";

const Home = () => (
    <div>
        <img
            style={{
                width: "100px",
                borderRadius: "50px"
            }}
            src="logo.jpg"
        ></img>
        <hr />
    </div>
);

export default () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/welcome">
                        <Welcome />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};
