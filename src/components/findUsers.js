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
                <div
                    id="backgroundScroll"
                    className={classes.backgroundScroll}
                ></div>
                <div id="searchContainer" className={classes.searchContainer}>
                    <div>
                        <TextField
                            className={classes.searchInput}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            label="Search...."
                            InputProps={{ className: classes.input }}
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
                            className={classes.buttons}
                            variant="contained"
                            color="primary"
                            onClick={() => setUser([])}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
                <div>
                    {hasError && <div className={classes.error}>Error</div>}
                </div>

                <div
                    id="usersContainerScroll"
                    className={classes.usersContainerScroll}
                >
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
    },
    input: {
        color: "white"
    }
}));

const myStyles = makeStyles(() => ({
    container: {
        width: "100vw",
        height: "100vh",
        background: "black",
        display: "grid"
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
        width: "70.15%",
        height: "70%",
        alignSelf: "center",
        justifySelf: "center",
        overflowY: "scroll",
        background: "black",
        zIndex: "3",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: "50px"
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
        alignSelf: "center",
        justifySelf: "center",
        background: "linear-gradient(315deg, #ff0000, #ffc107)",
        zIndex: "2",
        transform: "skew(2deg, 2deg)",
        marginTop: "50px"
    },
    searchInput: {
        marginBottom: "10px",
        zIndex: "11",
        border: "1px solid #303f9f"
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
        margin: "0 5px 0 5px",
        zIndex: "11"
    },
    searchContainer: {
        background: "black",
        position: "absolute",
        top: "120px",
        zIndex: "11",
        width: "70%",
        height: "130px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));
