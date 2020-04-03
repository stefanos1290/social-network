import React from "react";
import { ProfilePic } from "./profile";
import BioEditor from "./bio-editor";
import { makeStyles } from "@material-ui/core/styles";

export function Profile(props) {
    const classes = myStyles();
    return (
        <div className={classes.container}>
            <div className={classes.profileCard}>
                <div
                    id="profileBackdround"
                    className={classes.background}
                ></div>
                <ProfilePic
                    className={classes.profileComponent}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    imageUrl={props.imageUrl}
                    bio={props.bio}
                />
                <BioEditor
                    className={classes.bioComponent}
                    bio={props.bio}
                    updateBio={props.updateBio}
                />
            </div>
        </div>
    );
}
const myStyles = makeStyles(() => ({
    container: {
        width: "100vw",
        height: "100vh",
        background: "black"
    },
    background: {
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(315deg,#e91e65, #5d02ff)",
        width: "100%",
        height: "100%",
        zIndex: "-10",
        borderRadius: "20px"
    },
    profileCard: {
        position: "relative",
        top: "50%",
        left: "50%",
        zIndex: "1",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));
