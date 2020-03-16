import React from "react";

export default function ChatMessage(props) {
    const date = props.created_at;
    const formatter = new Intl.DateTimeFormat("default", { month: "short" });
    const DATE = `${new Date(date).getDate()}.${formatter.format(
        new Date(date)
    )} ${new Date(date).getFullYear()}, ${new Date(date).getHours()}:${new Date(
        date
    ).getMinutes()}`;

    return (
        <div style={{ marginLeft: "10px", border: "1px solid, black" }}>
            <div style={{ display: "flex" }}>
                <img
                    style={{
                        width: "65px",
                        height: "65px",
                        borderRadius: "10px",
                        display: "inline-block"
                    }}
                    src={`${props.image}`}
                />
                <span
                    style={{
                        display: "inline-block",
                        marginTop: "0",
                        marginLeft: "5px",
                        color: "#d81a36",
                        fontSize: "20px"
                    }}
                >
                    {props.firstname} {props.lastname}{" "}
                </span>
                <span
                    style={{ color: "e0dede", fontSize: "13px", margin: "5px" }}
                >
                    {DATE}
                </span>
            </div>
            <p
                style={{
                    position: "relative",
                    left: "75px",
                    bottom: "40px"
                }}
            >
                {props.msg}
            </p>
        </div>
    );
}
