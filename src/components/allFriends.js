import React from "react";
import { unfriend } from "../redux/actions/friends.actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function AllFriends({ friends }) {
    const dispatch = useDispatch();
    const classes = myStyles();

    if (!friends) {
        return null;
    }

    return (
        <div>
            <div>
                <div id="allFriendsContainer" className={classes.container}>
                    <h2 id="allFriendsTitle" className={classes.title}>
                        These people are currently your friends
                    </h2>

                    <div
                        id="friendCardScrollBackground"
                        className={classes.friendCardScrollBackground}
                    ></div>

                    <div id="friendsScroll" className={classes.friendsScroll}>
                        {" "}
                        <div>
                            {friends.length === 0 && (
                                <div className={classes.noFriendsMessage}>
                                    No friends
                                </div>
                            )}
                            {friends.map((friend) => (
                                <div key={friend.id}>
                                    <div className={classes.friendCard}>
                                        <div
                                            className={
                                                classes.friendCardBackground
                                            }
                                        ></div>
                                        <h2 className={classes.name}>
                                            {friend.firstname} {friend.lastname}
                                        </h2>
                                        <Link to={`/user/${friend.id}`}>
                                            <img
                                                className={classes.profilePic}
                                                src={
                                                    friend.image === null
                                                        ? "default.png"
                                                        : friend.image
                                                }
                                            />
                                        </Link>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                dispatch(unfriend(friend.id))
                                            }
                                        >
                                            Unfriend
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const myStyles = makeStyles(() => ({
    container: {
        width: "50vw",
        height: "100vh",
        backgroundColor: "black",
    },
    friendCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "100px",
        marginTop: "20px",
    },
    friendCardBackground: {
        position: "absolute",
        width: "268px",
        height: "150px",
        background: "linear-gradient(315deg,#e91e65, #5d02ff)",
        zIndex: "-1",
        opacity: "0.5",
        borderRadius: "20px",
    },
    friendCardScrollBackground: {
        width: "30.5%",
        height: "68.5%",
        position: "absolute",
        right: "9.8vw",
        marginTop: "61px",
        zIndex: "1",
        transform: "skew(1deg, 1deg)",
        background: "linear-gradient(315deg,#e91e65, #5d02ff)",
    },
    title: {
        width: "100%",
        color: "white",
        background: "black",
        position: "relative",
        textAlign: "center",
    },
    friendsScroll: {
        width: "30%",
        height: "68%",
        position: "absolute",
        background: "black",
        right: "10vw",
        marginTop: "63px",
        zIndex: "2",
        overflowY: "scroll",
    },
    name: {
        margin: "0",
        color: "white",
    },
    profilePic: {
        height: "60px",
    },
    noFriendsMessage: {
        color: "white",
    },
}));
