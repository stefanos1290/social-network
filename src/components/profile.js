import React from "react";

export function ProfilePic({ firstName, lastName, imageUrl }) {
    let a;
    if (imageUrl === "./null") {
        a = "default.png";
    } else {
        a = imageUrl;
    }

    return (
        <div>
            <h1>
                {firstName} {lastName}
            </h1>
            <img style={{ width: "200px", borderRadius: "20px" }} src={a} />
        </div>
    );
}
