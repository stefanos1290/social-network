import React from "react";
import Registration from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default () => {
    return (
        <div style={{ backgroundColor: "#66d9fd", margin: "0" }}>
            <h1 style={{ textAlign: "center" }}>Welcome</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
};
