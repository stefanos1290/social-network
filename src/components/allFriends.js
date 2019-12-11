import React from "react";
import { unfriend } from "../redux/actions/friends.actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function AllFriends({ friends }) {
    const dispatch = useDispatch();
    if (!friends) {
        return null;
    }
    return (
        <div>
            <hr />
            <h2>These people are currently your friends</h2>
            <hr />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    height: "222px"
                }}
                className="allFriendsContainer"
            >
                {friends.length === 0 && <div>No friends</div>}
                {friends.map(friend => (
                    <div key={friend.id}>
                        <div
                            className="friendCard"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid black",
                                alignItems: "center",
                                width: "200px",
                                height: "220px",
                                justifyContent: "space-evenly",
                                borderRadius: "10px",
                                backgroundColor: "#30b6db"
                            }}
                        >
                            <h2 style={{ margin: "0" }} className="name">
                                {friend.firstname} {friend.lastname}
                            </h2>
                            <Link to={`/user/${friend.id}`}>
                                <img
                                    style={{ width: "100px" }}
                                    src={friend.image}
                                />
                            </Link>
                            <button
                                style={{ width: "90px" }}
                                onClick={e => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
