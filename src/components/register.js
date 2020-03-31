import React, { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

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
        const { classes } = this.props;
        const { firstName, lastName, email, password, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="register">
                <h1 className={classes.welcome}>
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
                    <img className={classes.logo} src="logo.jpg"></img>
                    <div className={classes.backgroundForm}></div>
                    {this.state.error && (
                        <div className={classes.error}>
                            Something went wrong! Please try again!
                        </div>
                    )}
                    <div className={classes.formRegisterContainer}>
                        <h1 className={classes.registerText}>Register</h1>{" "}
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
                        <div className={classes.loginMassage}>
                            Already a member?{" "}
                            <Link className={classes.linkLogin} to="/login">
                                LOG IN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = thene => ({
    welcome: {
        zIndex: "1",
        position: "absolute",
        top: "100px",
        left: "166px",
        color: "white"
    },
    logo: {
        borderRadius: "100%",
        display: "block",
        width: "700px",
        left: "-80px",
        top: "-120px",
        position: "absolute"
    },
    backgroundForm: {
        width: "400px",
        height: "500px",
        position: "absolute",
        right: "130px",
        top: "100px",
        backgroundColor: "black",
        borderRadius: "20px",
        opacity: "0.7"
    },
    error: {
        color: "red",
        fontSize: "20px",
        position: "relative",
        right: "-315px",
        top: "120px"
    },
    formRegisterContainer: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        right: "240px",
        top: "170px"
    },
    registerText: {
        color: "white"
    },
    loginMassage: {
        color: "white"
    },
    linkLogin: {
        textDecoration: "none",
        color: "#303f9f"
    }
});

export default withStyles(styles)(Registration);
