import React, { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            loading: false,
            error: false
        };
    }

    handleRegister() {
        this.setState({ loading: true });
        const { firstName, lastName, email, password } = this.state;
        axios
            .post("/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            .then(console.log("register then")) // TODO: finish then
            .catch(e => {
                this.setState({ error: true });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { firstName, lastName, email, password, loading } = this.state;

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
                    <h1>Register here</h1>
                    <input
                        onChange={e =>
                            this.setState({ firstName: e.target.value })
                        }
                        value={firstName}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        onChange={e =>
                            this.setState({ lastName: e.target.value })
                        }
                        value={lastName}
                        type="text"
                        placeholder="Last Name"
                    />
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
                    <button onClick={() => this.handleRegister()}>
                        Register
                    </button>
                </div>
                <div>
                    {/* <h1>I am login!</h1> */}
                    <Link to="/login">click here to Login</Link>
                </div>
            </div>
        );
    }
}
export default Registration;
