import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers } from "../redux/actions/friends.actions";
import { getAllFriends } from "../redux/selectors/friends.selector";
import Wannabes from "./wannabes";
import AllFriends from "./allFriends";

export default function NewFriends() {
    const dispatch = useDispatch();

    const friends = useSelector(getAllFriends);

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);

    return (
        <div
            id="wannabesAllFriendsContainer"
            style={{ display: "flex", flexDirection: "row" }}
        >
            <div id="yummyWannabes" style={{ width: "50vw" }}>
                <Wannabes />
            </div>
            <div id="yummyFriends" style={{ width: "50vw" }}>
                <AllFriends friends={friends} />
            </div>
        </div>
    );
}
