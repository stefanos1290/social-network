import axios from "../axios";
import React, { useState, useEffect } from "react";

export default function onlineUsers() {
    const [onlineUserData, setOnlineUserData] = useState([]);

    useEffect(() => {
        const getOnlineUserData = () => {
            axios.get("/users/onlineusers").then(({ data }) => {
                setOnlineUserData(data);
            });
        };
        getOnlineUserData();
    }, []);

    return (
        <div className="onlineUsersComponentContainer">
            {onlineUserData.map(function (item) {
                return (
                    <div key={item.id} className="onlineUserCard">
                        <h3 className="onlineUserName">
                            {item.firstname} {item.lastname}
                        </h3>
                        <img
                            className="onlineUserProfilePic"
                            src={item.image}
                        />
                        <div className="onlineUserBioContainer">
                            {item.bio === "" ? (
                                <h3 className="onlineUserNoBioMessage">
                                    No Bio added yet
                                </h3>
                            ) : (
                                <h3 className="onlineUserBio">{item.bio}</h3>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
