import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { friendsActions } from "../redux/actions";

export default function makeFriend() {
    const dispatch = useDispatch();
    const users = useSelector(
        state => state.users && state.users.filter(user => user.makeFriend)
    );
    if (!users) {
        return null;
    }
    console.log(users);
    const hotUsers = (
        <div className="users">
            {users.map(user => (
                <div className="user">
                    <img src={user.image} />
                    <div className="buttons">
                        <button
                            onClick={() =>
                                dispatch(friendsActions.unfriend(user.id))
                            }
                        >
                            unfriend
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="accept">
            {!users.length && <div>Nobody is hot!</div>}
            {!!users.length && hotUsers}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/unfriend">See who you unfriended</Link>
            </nav>
        </div>
    );
}
