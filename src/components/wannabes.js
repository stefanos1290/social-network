import React from "react";
import { makeFriend } from "../redux/actions/friends.actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Wannabes() {
    const dispatch = useDispatch();
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
            <h2>These people want to be your friends</h2>
            <hr />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    height: "222px"
                }}
                className="wannabesContainer"
            >
                {wannabes.length > 0 &&
                    wannabes.map(wannabe => (
                        <div key={wannabe.id}>
                            <div>
                                <div
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
                                    className="wannabeCard"
                                >
                                    <h2 style={{ margin: "0" }}>
                                        {wannabe.firstname} {wannabe.lastname}
                                    </h2>
                                    <Link to={`/user/${wannabe.id}`}>
                                        <img
                                            style={{ width: "100px" }}
                                            src={wannabe.image}
                                        />
                                    </Link>
                                    <button
                                        style={{ width: "166px" }}
                                        onClick={e =>
                                            dispatch(makeFriend(wannabe.id))
                                        }
                                    >
                                        accept friend request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                {wannabes.length === 0 && <div>No wannabes</div>}
            </div>
        </div>
    );
}
