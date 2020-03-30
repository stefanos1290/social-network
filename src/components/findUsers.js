import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const User = props => {
    const classes = stylesUsers();

    return (
        <div className={classes.usersContainer}>
            <div className={classes.imageName}>
                <div className={classes.name}>
                    {props.firstname} {props.lastname}
                </div>
                <Link style={{ alignSelf: "center" }} to={`/user/${props.id}`}>
                    <img className={classes.image} src={props.image} />
                </Link>
            </div>
            <p className={classes.bio}>{props.bio}</p>
        </div>
    );
};

export default () => {
    const [user, setUser] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState("");
    const [loadUsers, setLoadUsers] = useState(false);

    const classes = myStyles();

    useEffect(() => {
        if (!loadUsers) {
            return;
        }
        async function fetchData() {
            try {
                const { data } = await axios.post("/users", { value: value });
                setUser(data);
                setHasError(false);
            } catch (error) {
                setHasError(true);
            } finally {
                setLoadUsers(false);
            }
        }
        fetchData();
    }, [loadUsers]);

    return (
        <div className={classes.container}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <div className={classes.backgroundScroll}></div>
                <div className={classes.textfieldContainer}>
                    <h1 className={classes.searchFor}>Search for {value}</h1>
                    <div>
                        <TextField
                            className={classes.searchInput}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            className={classes.buttons}
                            variant="contained"
                            color="primary"
                            onClick={() => setLoadUsers(true)}
                        >
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setUser([])}
                        >
                            Clear
                        </Button>
                    </div>
                    <div>
                        {hasError && <div className={classes.error}>Error</div>}
                    </div>
                </div>

                <div className={classes.usersContainerScroll}>
                    {user
                        .sort()
                        .slice(0, 10)
                        .map(user => {
                            return (
                                <div
                                    id="card"
                                    className={classes.userCard}
                                    key={user.id}
                                >
                                    <div
                                        className={classes.userCardBackground}
                                    ></div>
                                    <User {...user} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

const stylesUsers = makeStyles(() => ({
    usersContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "220px"
    },
    imageName: {
        display: "flex",
        flexDirection: "column"
    },
    name: {
        fontSize: "25px",
        textAlign: "center",
        margin: "17px",
        color: "white"
    },
    image: {
        height: "100px",
        borderRadius: "20px",
        alignItems: "center"
    },
    bio: {
        color: "white",
        padding: "10px"
    }
}));

const myStyles = makeStyles(() => ({
    container: {
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center"
    },
    textfieldContainer: {
        display: "flex",
        flexDirection: "column",
        background: "black",
        position: "absolute",
        width: "70%",
        marginTop: "40px",
        height: "118px",
        alignItems: "center",
        zIndex: "4"
    },
    usersContainerScroll: {
        position: "absolute",
        width: "100%",
        height: "300px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflowY: "scroll",
        background: "white",
        zIndex: "3",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    searchFor: {
        color: "white"
    },
    error: {
        fontSize: "100px",
        color: "red"
    },
    backgroundScroll: {
        position: "absolute",
        width: "71%",
        height: "71%",
        marginTop: "40px",
        background: "linear-gradient(315deg, #ff0000, #ffc107)",
        zIndex: "2",
        transform: "skew(2deg, 2deg)"
    },
    searchInput: {
        marginBottom: "10px"
    },
    userCard: {
        borderRadius: "20px",
        margin: "50px",
        position: "relative"
    },
    userCardBackground: {
        position: "absolute",
        width: "99%",
        height: "100%",
        background: "linear-gradient(315deg, #ff0000, #ffc107)",
        zIndex: "-1000",
        opacity: "0.5",
        borderRadius: "20px"
    },
    buttons: {
        margin: "0 5px 0 5px"
    }
}));
