import React from "react";

import { Link } from "react-router-dom";

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
            .then(console.log("login then")) // TODO: finish then
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
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px"
                    }}
                >
                    {this.state.error && (
                        <div>Something went wrong. Please try again!</div>
                    )}
                    <input
                        onChange={e => this.setState({ email: e.target.value })}
                        value={email}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        onChange={e =>
                            this.setState({ password: e.target.value })
                        }
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    <button onClick={() => this.handleLogin()}>Register</button>
                </div>
                <div>
                    <h1>I am login!</h1>
                    <Link to="/">take me to ragistration</Link>
                </div>
            </div>
        );
    }
}
// export default Login;
