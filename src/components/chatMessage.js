import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function ChatMessage(props) {
    const date = props.created_at;
    const DATE = `${new Date(date).getDate()}.${new Date(
        date
    ).getMonth()}.${new Date(date).getFullYear()}, ${new Date(
        date
    ).getHours()}:${new Date(date).getMinutes()}`;

    const classes = myStyles();

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.messageBackground}></div>
                <img className={classes.image} src={`${props.image}`} />
                <div className={classes.lettersContainer}>
                    <span className={classes.name}>
                        {props.firstname} {props.lastname}{" "}
                    </span>
                    <span className={classes.date}>{DATE}</span>
                    <p className={classes.massage}>{props.msg}</p>
                </div>
            </div>
        </div>
    );
}

const myStyles = makeStyles(() => ({
    container: {
        marginTop: "30px",
        zIndex: "1",
        position: "relative",
        opacity: "1",
        width: "100%",
        height: "100%"
    },
    messageBackground: {
        width: "100%",
        height: "100%",
        background: "darkgray",
        opacity: "0.5",
        zIndex: "-1",
        position: "absolute",
        borderRadius: "20px"
    },
    image: {
        width: "60px",
        height: "60px",
        borderRadius: "100%",
        position: "relative",
        top: "-15px",
        left: "-5px"
    },
    lettersContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        top: "-65px"
    },
    name: {
        fontSize: "25px"
    },
    date: {
        fontSize: "13px",
        position: "absolute",
        right: "5px",
        top: "40px"
    },
    massage: {
        position: "relative",
        top: "30px",
        padding: "20px"
    }
}));
