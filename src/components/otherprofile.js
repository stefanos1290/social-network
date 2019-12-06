import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Friendshipbutton } from "./friendship";

export default props => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        imageUrl: "",
        bio: "",
        userId: ""
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
                        userId: data.meId
                    });
                    setUserDataLoaded(true);
                }
            });
        };
        getData();
    }, []);

    if (!userDataLoaded) {
        return <div>Loading..</div>;
    }

    if (!userData.firstname) {
        return <h1>The user does not exist get over it</h1>;
    }
    return (
        <div>
            <h1>
                {userData.firstname} {userData.lastname}
            </h1>
            <img src={userData.imageUrl} />
            <p>{userData.bio}</p>
            <Friendshipbutton otherId={props.match.params.id} />
        </div>
    );
};
