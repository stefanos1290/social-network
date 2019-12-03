import React from "react";
import { ProfilePic } from "./profile";
import { BioEditor } from "./bio-editor";

export function Profile(props) {
    return (
        <div className="container">
            <ProfilePic
                firstName={props.firstName}
                lastName={props.lastName}
                imageUrl={props.imageUrl}
                bio={props.bio}
            />
            <BioEditor bio={props.bio} updateBio={props.updateBio} />
        </div>
    );
}
