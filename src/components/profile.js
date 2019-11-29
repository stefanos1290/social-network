import React from "react";

export function ProfilePic({ firstName, lastName, imageUrl }) {
    console.log("imageUrl: ", imageUrl);

    imageUrl = imageUrl || "default.png";

    return (
        <div>
            <h2>
                I am the profile pic! {firstName} {lastName}
            </h2>
            <img
                style={{ width: "200px", borderRadius: "20px" }}
                src={imageUrl}
            />
        </div>
    );
}
