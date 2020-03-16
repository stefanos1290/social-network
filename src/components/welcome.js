import React, { useEffect } from "react";
import Registration from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default props => {
    useEffect(() => {
        props.setHeaderVisibility(false);

        return () => {
            props.setHeaderVisibility(true);
        };
    }, []);

    return (
        <div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
};
