import React from "react";
import { makeFriend } from "../redux/actions/friends.actions";
import { useSelector, useDispatch } from "react-redux";

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
                style={{ display: "flex", justifyContent: "space-evenly" }}
                className="user"
            >
                {wannabes.length > 0 &&
                    wannabes.map(wannabe => (
                        <div key={wannabe.id}>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                    className="wannabesContainer"
                                >
                                    <img
                                        style={{ width: "100px" }}
                                        src={wannabe.image}
                                    />
                                    <h2>
                                        {wannabe.firstname} {wannabe.lastname}
                                    </h2>
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
