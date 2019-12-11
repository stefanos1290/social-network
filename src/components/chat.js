import React, { useEffect, useRef } from "react";
import { socket } from "../../socket/socket";
import { useSelector } from "react-redux";
import ChatMessage from "./chatMessage";

export function Chat() {
    const elemRef = useRef();

    const chatMessages = useSelector(
        state => state && state.chatReducer && state.chatReducer.chats
    );

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    });

    const keyCheck = e => {
        if (e.key === "Enter") {
            socket.emit("chatMessage", e.target.value);
            e.target.value = null;
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#33b5db",
                border: "1px solid black",
                borderRadius: "30px",
                width: "500px",
                margin: "auto",
                marginTop: "30px",
                display: "flex",
                flexDirection: "column"
            }}
            className="chat"
        >
            <h1
                style={{
                    textAlign: "center"
                }}
            >
                Chat Room
            </h1>
            <div
                ref={elemRef}
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    marginLeft: "25px",
                    width: "450px",
                    backgroundColor: "#6cc5dd",
                    border: "1px solid black"
                }}
                className="chatContainer"
            >
                {chatMessages.map(item => (
                    <div key={`chat_id_${item.id}`}>
                        <ChatMessage {...item} />
                    </div>
                ))}
            </div>
            <textarea
                style={{
                    width: "350px",
                    margin: "auto",
                    marginBottom: "3px"
                }}
                onKeyUp={keyCheck}
                placeholder="add your message here..."
            ></textarea>
        </div>
    );
}
