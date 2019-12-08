import React from "react";
import { unfriend } from "../redux/actions/friends.actions";
import { useDispatch } from "react-redux";

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
                style={{ display: "flex", justifyContent: "space-evenly" }}
                className="asdf"
            >
                {friends.length === 0 && <div>No friends</div>}
                {friends.map(friend => (
                    <div key={friend.id}>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <img
                                style={{ width: "100px" }}
                                src={friend.image}
                            />
                            <h2 className="name">
                                {friend.firstname} {friend.lastname}
                            </h2>
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
