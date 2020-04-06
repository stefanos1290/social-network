import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Friendshipbutton } from "./friendship";
import CircularProgress from "@material-ui/core/CircularProgress";

export default (props) => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        imageUrl: "",
        bio: "",
        userId: "",
    });

    const [userDataLoaded, setUserDataLoaded] = useState(false);

    useEffect(() => {
        if (userDataLoaded) {
            return;
        }
        const getData = () => {
            axios.get(`/userjson/${props.match.params.id}`).then(({ data }) => {
                if (props.match.params.id == userData.userId) {
                    props.history.push("/");
                } else {
                    setUserData({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        imageUrl: data.image,
                        bio: data.bio,
                        userId: data.meId,
                    });
                    setUserDataLoaded(true);
                }
            });
        };
        getData();
    }, []);

    if (!userDataLoaded) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (!userData.firstname) {
        return <h1>The user does not exist get over it</h1>;
    }
    return (
        <div className="otherUserComponentContainer">
            <div className="otherUserCard">
                <h1 className="otherUserName">
                    {userData.firstname} {userData.lastname}
                </h1>
                <img
                    className="otherUserProfilePic"
                    src={`/${userData.imageUrl}`}
                />
                {userData.bio === "" ? (
                    <p className="otherUserNoBioMessage">No Bio added yet</p>
                ) : (
                    <p className="otherUserBio">{userData.bio}</p>
                )}
                <Friendshipbutton
                    className="otherUserFriendshipButton"
                    otherId={props.match.params.id}
                />
            </div>
        </div>
    );
};
