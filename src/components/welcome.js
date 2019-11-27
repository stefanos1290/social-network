import React from "react";
import Registration from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default () => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Welcome to</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
};
