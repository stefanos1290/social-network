import React from "react";
import Registration from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setHeaderVisibility(false);
    }

    componentWillUnmount() {
        this.props.setHeaderVisibility(true);
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Welcome</h1>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
