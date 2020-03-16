import React, { useEffect, useRef } from "react";
import { socket } from "../../socket/socket";
import { useSelector } from "react-redux";
import ChatMessage from "./chatMessage";
import TextField from "@material-ui/core/TextField";

// const Background = require("../../public/images/chat-room.jpeg"); // tto prokali to error

export function Chat() {
    const elemRef = useRef();

    const onlineUsers = useSelector(s => s.friendsReducer.onlineUsers);

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
            // style in css file - background image
            className="chat"
        >
            <h1
                className="chat-room"
                style={{
                    textAlign: "center",
                    marginTop: "70px",
                    transition: "0.5s",
                    letterSpacing: "4px",
                    fontFamily: "consolas",
                    textTransform: "uppercase",
                    zIndex: "3",
                    color: "white"
                }}
            >
                <div className="test2"></div>
                Chat Room
                <div className="test3"></div>
            </h1>
            <div
                style={{
                    height: "490px",
                    width: "450px",
                    position: "absolute",
                    backgroundColor: "black",
                    top: "150.4px",
                    left: "427.5px",
                    zIndex: "1",
                    opacity: "0.8",
                    borderRadius: "20px"
                }}
            ></div>
            <div
                ref={elemRef}
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    scrollBehavior: "smooth",
                    marginLeft: "25px",
                    width: "450px",
                    zIndex: "2",
                    position: "relative",
                    top: "30px"
                }}
                className="chatContainer"
            >
                {chatMessages.map(item => (
                    <div key={`chat_id_${item.id}`}>
                        <ChatMessage {...item} />
                    </div>
                ))}
            </div>
            <TextField
                id="standard-search"
                label="Message"
                type="search"
                style={{
                    width: "350px",
                    zIndex: "3",
                    position: "relative",
                    top: "45px"
                }}
                onKeyUp={keyCheck}
                placeholder="add your message here..."
            ></TextField>
        </div>
    );
}
