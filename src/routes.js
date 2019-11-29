import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "./components/welcome";
import { App } from "./components/app";
import Uploader from "./components/uploader";
import { profilePic } from "./components/profile";

const Home = () => <App />;

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
