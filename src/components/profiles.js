import React from "react";
import { ProfilePic } from "./profile";
import { BioEditor } from "./bio-editor";

export function Profile(props) {
    console.log("profiles props: ", props);
    return (
        <div className="container">
            <h1>I am the profile component! {props.firstName}</h1>
            <ProfilePic
                firstName={props.firstName}
                lastName={props.lastName}
                imageUrl={props.imageUrl}
            />
            <BioEditor bio={props.bio} updateBio={props.updateBio} />
        </div>
    );
}
