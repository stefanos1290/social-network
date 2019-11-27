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
            .then(({ data }) => {
                console.log(data);
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
        const { firstName, lastName, email, password, loading } = this.state;

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
                    <img
                        style={{
                            borderRadius: "230px",
                            display: "block",
                            width: "400px",
                            left: "-50%",
                            right: "-50%",
                            position: "relative"
                        }}
                        src="logo.jpg"
                    ></img>
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
                        required
                    />
                    <input
                        onChange={e =>
                            this.setState({ lastName: e.target.value })
                        }
                        value={lastName}
                        type="text"
                        placeholder="Last Name"
                        required
                    />
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
                <button
                    style={{ margin: "10px" }}
                    onClick={() => this.handleRegister()}
                >
                    Register
                </button>

                <div>
                    Already a member? <Link to="/login">Log In</Link>
                </div>
            </div>
        );
    }
}
export default Registration;
