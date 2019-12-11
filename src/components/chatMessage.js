import React from "react";

export default function ChatMessage(props) {
    const date = props.created_at;

    return (
        <div style={{ marginTop: "50px" }}>
            <div style={{ display: "flex" }}>
                <img
                    style={{
                        width: "65px",
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
                    style={{ color: "gray", fontSize: "13px", margin: "5px" }}
                >
                    {date}
                </span>
            </div>
            <p
                style={{
                    overflowWrap: "break-word",
                    marginTop: "0",
                    marginBottom: "0",
                    marginRight: "15px",
                    marginLeft: "70px"
                }}
            >
                {props.msg}
            </p>
        </div>
    );
}
