import React from "react";

import { Link } from "react-router-dom";
import axios from "../axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

class Login extends React.Component {
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
            .catch(() => {
                this.setState({ error: true });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { classes } = this.props;
        const { email, password, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div
                className="login"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden"
                }}
            >
                <h1 className={classes.welcome}>
                    <div className="test2"></div>
                    WELCOME
                    <div className="test3"></div>
                </h1>
                <div className={classes.container}>
                    <div className={classes.backgroundForm}></div>
                    <img className={classes.logo} src="logo.jpg"></img>
                    {this.state.error && (
                        <div style={{ color: "red", fontSize: "20px" }}>
                            Something went wrong! Please try again!
                        </div>
                    )}
                    <div className={classes.formContainer}>
                        <h1 style={{ color: "white" }}>Login</h1>
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
                            onClick={() => this.handleLogin()}
                        >
                            Login
                        </Button>
                        <div>
                            <Link className={classes.linkRegister} to="/">
                                REGISTER
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    welcome: {
        position: "absolute",
        color: "white",
        zIndex: "1",
        top: "124px",
        left: "144px"
    },
    logo: {
        borderRadius: "100%",
        width: "700px",
        position: "absolute",
        left: "-100px",
        top: "-100px",
        display: "block",
        overflowX: "hidden"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        width: "200px",
        overflow: "hidden"
    },
    backgroundForm: {
        width: "350px",
        height: "300px",
        backgroundColor: "black",
        position: "absolute",
        right: "158px",
        top: "250px",
        opacity: "0.7",
        zIndex: "1",
        borderRadius: "20px"
    },
    formContainer: {
        position: "absolute",
        right: "249px",
        top: "280px",
        display: "flex",
        flexDirection: "column",
        zIndex: "1"
    },
    linkRegister: {
        textDecoration: "none",
        color: "#303f9f"
    }
});

export default withStyles(styles)(Login);
