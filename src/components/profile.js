import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export function ProfilePic({ firstName, lastName, imageUrl }) {
    const classes = myStyles();

    let a;
    if (imageUrl === "null") {
        a = "/default.png";
    } else {
        a = imageUrl;
    }
    return (
        <div id="profileConainer" className={classes.container}>
            <div>
                <img id="imageProfile" className={classes.images} src={a} />
            </div>
            <div>
                <h1 id="nameProfile" className={classes.name}>
                    {firstName} {lastName}
                </h1>
            </div>
        </div>
    );
}

const myStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "center"
    },
    images: {
        width: "100px",
        height: "100px",
        borderRadius: "100%",
        position: "absolute",
        top: "10px",
        left: "10px"
    },
    name: {
        color: "black",
        position: "absolute",
        top: "40px",
        right: "70px"
    }
}));
