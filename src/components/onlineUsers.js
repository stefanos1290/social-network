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
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                {onlineUserData.map(function (item) {
                    return (
                        <div
                            key={item.id}
                            className="onlineUsersCard"
                            style={{
                                border: "1px solid black",
                                borderRadius: "30px",
                                width: "250px",
                                alignItems: "center",
                                backgroundColor: "#3b8c9e",
                            }}
                        >
                            <h3
                                style={{
                                    margin: "0",
                                    marginLeft: "60px",
                                }}
                            >
                                {item.firstname} {item.lastname}
                            </h3>
                            <img
                                style={{
                                    width: "200px",
                                    borderRadius: "30px",
                                    alignItems: "center",
                                    marginLeft: "25px",
                                }}
                                src={item.image}
                            />
                            <h3>{item.bio}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
