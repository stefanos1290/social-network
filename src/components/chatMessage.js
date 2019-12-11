import React from "react";

export default function ChatMessage(props) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap-revernse",
                marginBottom: "10px"
            }}
        >
            <img
                style={{ width: "65px", borderRadius: "10px" }}
                src={`./${props.image}`}
            />
            <div style={{ marginLeft: "5px", height: "20px" }}>
                {props.firstname} {props.lastname} {props.created_at}
                <div style={{ margin: "7px" }}>{props.msg}</div>
            </div>
        </div>
    );
}
