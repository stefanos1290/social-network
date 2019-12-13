import React from "react";

export function ProfilePic({ firstName, lastName, imageUrl }) {
    let a;
    if (imageUrl === "null") {
        a = "/default.png";
    } else {
        a = imageUrl;
    }

    return (
        <div style={{ display: "flex" }}>
            <div>
                <img
                    style={{
                        width: "250px",
                        borderRadius: "20px",
                        margin: "15px"
                    }}
                    src={a}
                />
            </div>
            <div>
                <h1>
                    {firstName} {lastName}
                </h1>
            </div>
        </div>
    );
}
