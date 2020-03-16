import React, { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
            .catch(() => {
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
                className="register"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100vw",
                    height: "100vh"
                }}
            >
                <h1
                    style={{
                        zIndex: "1",
                        position: "absolute",
                        top: "100px",
                        left: "166px",
                        color: "white"
                    }}
                >
                    <div className="test2"></div>
                    WELCOME
                    <div className="test3"></div>
                </h1>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "200px"
                    }}
                >
                    <img
                        style={{
                            borderRadius: "100%",
                            display: "block",
                            width: "700px",
                            left: "-80px",
                            top: "-120px",
                            position: "absolute"
                        }}
                        src="logo.jpg"
                    ></img>
                    <div
                        style={{
                            width: "400px",
                            height: "500px",
                            position: "absolute",
                            right: "130px",
                            top: "100px",
                            backgroundColor: "black",
                            borderRadius: "20px",
                            opacity: "0.7"
                        }}
                    ></div>
                    {this.state.error && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "20px",
                                position: "relative",
                                right: "-315px",
                                top: "120px"
                            }}
                        >
                            Something went wrong! Please try again!
                        </div>
                    )}
                    <div
                        className="form-register-container"
                        style={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            right: "240px",
                            top: "170px"
                        }}
                    >
                        <h1 style={{ color: "white" }}>Register</h1>{" "}
                        <TextField
                            onChange={e =>
                                this.setState({ firstName: e.target.value })
                            }
                            value={firstName}
                            type="text"
                            placeholder="First Name"
                            required
                            id="standard-required"
                        />
                        <TextField
                            onChange={e =>
                                this.setState({ lastName: e.target.value })
                            }
                            value={lastName}
                            type="text"
                            placeholder="Last Name"
                            required
                            id="standard-required"
                        />
                        <TextField
                            onChange={e =>
                                this.setState({ email: e.target.value })
                            }
                            value={email}
                            type="email"
                            placeholder="Email"
                            required
                            id="standard-required"
                        />
                        <TextField
                            onChange={e =>
                                this.setState({ password: e.target.value })
                            }
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                            id="standard-required"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "10px" }}
                            onClick={() => this.handleRegister()}
                        >
                            Register
                        </Button>
                        <div>
                            Already a member? <Link to="/login">Log In</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Registration;
