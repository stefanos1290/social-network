import React from "react";
import { makeFriend } from "../redux/actions/friends.actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function Wannabes() {
    const dispatch = useDispatch();
    const classes = myStyles();

    const wannabes = useSelector(state => {
        return (
            state.friendsReducer.users &&
            state.friendsReducer.users.filter(
                wannabe => wannabe.accepted == false
            )
        );
    });

    if (!wannabes) {
        return null;
    }

    return (
        <div>
            <div className={classes.wannabesContainer}>
                <h2 className={classes.title}>
                    These people want to be your friends
                </h2>
                <div className={classes.wannabesScrollBackground}></div>
                <div className={classes.wannabeScroll}>
                    {wannabes.length > 0 &&
                        wannabes.map(wannabe => (
                            <div key={wannabe.id}>
                                <div>
                                    <div className={classes.wannabeCard}>
                                        <div
                                            className={
                                                classes.wannabeCardBackground
                                            }
                                        ></div>
                                        <h2 className={classes.name}>
                                            {wannabe.firstname}{" "}
                                            {wannabe.lastname}
                                        </h2>
                                        <Link to={`/user/${wannabe.id}`}>
                                            <img
                                                className={classes.profilePic}
                                                src={
                                                    wannabe.image === null
                                                        ? "default.png"
                                                        : wannabe.image
                                                }
                                            />
                                        </Link>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                dispatch(makeFriend(wannabe.id))
                                            }
                                        >
                                            accept
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {wannabes.length === 0 && (
                        <div style={{ color: "white" }}>No Friend Request</div>
                    )}
                </div>
            </div>
        </div>
    );
}

const myStyles = makeStyles(() => ({
    wannabesContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        height: "100vh",
        position: "absolute",
        left: "0px",
        width: "50%",
        background: "black"
    },
    title: {
        color: "white"
    },
    wannabesScrollBackground: {
        width: "60.5%",
        height: "68.5%",
        background: "linear-gradient(315deg,#ff0057, #e64a19)",
        zIndex: "2",
        position: "absolute",
        marginTop: "88px",
        transform: "skew(1deg, 1deg)"
    },
    wannabeScroll: {
        width: "60%",
        height: "68%",
        backgroundColor: "black",
        position: "absolute",
        marginTop: "90px",
        overflowY: "scroll",
        zIndex: "3"
    },
    wannabeCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "100px",
        marginTop: "20px"
    },
    wannabeCardBackground: {
        position: "absolute",
        width: "268px",
        height: "150px",
        background: "linear-gradient(315deg,#ff0057, #e64a19)",
        zIndex: "-1",
        opacity: "0.5",
        borderRadius: "20px"
    },
    profilePic: {
        height: "60px"
    },
    name: {
        margin: "0",
        color: "white"
    }
}));
