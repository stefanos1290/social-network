import React, { useEffect, useRef } from "react";
import { socket } from "../../socket/socket";
import { useSelector } from "react-redux";
import ChatMessage from "./chatMessage";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export function Chat() {
    const elemRef = useRef();

    const classes = myStyles();

    // const onlineUsers = useSelector(s => s.friendsReducer.onlineUsers);

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
        <div className="chat">
            <div className="chatBackground">
                <h1 className={classes.chatRoom}>
                    <div className="test2"></div>
                    Chat Room
                    <div className="test3"></div>
                </h1>
                <div ref={elemRef} className={classes.chatScroll}>
                    <div className={classes.chatScrollBackground}>
                        {chatMessages.map(item => (
                            <div key={`chat_id_${item.id}`}>
                                <ChatMessage {...item} />
                            </div>
                        ))}
                    </div>
                </div>
                <TextField
                    className={classes.textField}
                    id="standard-search"
                    label="Message"
                    type="search"
                    onKeyUp={keyCheck}
                    placeholder="add your message here..."
                ></TextField>
            </div>
        </div>
    );
}

const myStyles = makeStyles(() => ({
    chatRoom: { position: "sticky", top: "0" },
    chatScroll: { padding: "50px" },
    chatScrollBackground: {},
    textField: { position: "sticky", bottom: "0" }
}));
