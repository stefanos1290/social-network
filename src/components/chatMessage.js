import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function ChatMessage(props) {
    const date = props.created_at;
    const formatter = new Intl.DateTimeFormat("default", { month: "short" });
    const DATE = `${new Date(date).getDate()}.${formatter.format(
        new Date(date)
    )} ${new Date(date).getFullYear()}, ${new Date(date).getHours()}:${new Date(
        date
    ).getMinutes()}`;

    const classes = myStyles();

    return (
        <div>
            <div className={classes.container}>
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
        border: "1px solid black",
        marginTop: "20px"
    },
    image: {
        width: "60px",
        height: "60px",
        borderRadius: "100%",
        position: "relative",
        top: "-15px",
        visibility: "hidden"
    },
    lettersContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    name: {
        fontSize: "20px"
    },
    date: {
        fontSize: "13px"
    },
    massage: {
        // position: "relative",
        // left: "75px",
        // bottom: "40px"
    }
}));
