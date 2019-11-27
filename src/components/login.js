import React from "react";

import { Link } from "react-router-dom";
import axios from "../axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            error: false
        };
    }

    handleLogin() {
        this.setState({ loading: true });
        const { email, password } = this.state;
        axios
            .post("/login", {
                email: email,
                password: password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(e => {
                this.setState({ error: true });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { email, password, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "200px"
                    }}
                >
                    {this.state.error && (
                        <div>Something went wrong. Please try again!</div>
                    )}
                    <h1>I am login!</h1>
                    <input
                        onChange={e => this.setState({ email: e.target.value })}
                        value={email}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        onChange={e =>
                            this.setState({ password: e.target.value })
                        }
                        value={password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button onClick={() => this.handleLogin()}>Login</button>
                <div>
                    <Link to="/">take me to ragistration</Link>
                </div>
            </div>
        );
    }
}
