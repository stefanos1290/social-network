import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { makeStyles } from "@material-ui/core/styles";

const User = props => {
    return (
        <div style={{ display: "flex", marginTop: "10px" }}>
            <Link to={`/user/${props.id}`}>
                <img
                    style={{ width: "100px", height: "100px" }}
                    src={props.image}
                />
            </Link>
            <div
                style={{
                    fontSize: "25px",
                    textAlign: "center",
                    margin: "17px",
                    color: "white"
                }}
            >
                {props.firstname} {props.lastname}
            </div>
            <p style={{ color: "white" }}>{props.bio}</p>
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
            <div className={classes.backgroundScroll}></div>
            <div className={classes.scrollContainer}>
                <h1 className={classes.searchFor}>Search for {value}</h1>
                <div>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={() => setLoadUsers(true)}>Search</button>
                    <button onClick={() => setUser([])}>Clear</button>
                </div>
                <div>
                    {hasError && <div className={classes.error}>Error</div>}
                </div>

                <div>
                    {user
                        .sort()
                        .slice(0, 6)
                        .map(user => {
                            return (
                                <div key={user.id}>
                                    <User {...user} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

const myStyles = makeStyles(() => ({
    container: {
        width: "100vw",
        height: "87vh",
        background: "black",
        display: "flex",
        justifyContent: "center"
    },
    scrollContainer: {
        width: "70%",
        height: "70%",
        position: "absolute",
        overflowX: "scroll",
        marginTop: "40px",
        zIndex: "3"
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
        width: "72%",
        height: "72%",
        marginTop: "40px",
        background: "white",
        zIndex: "2"
    }
}));
