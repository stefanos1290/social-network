import React, { useEffect, useRef } from "react";
import { socket } from "../../socket/socket";
import { useSelector } from "react-redux";
import ChatMessage from "./chatMessage";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export function Chat() {
    const elemRef = useRef();
    const elemRef1 = useRef();

    const classes = myStyles();

    // const onlineUsers = useSelector(s => s.friendsReducer.onlineUsers);

    const chatMessages = useSelector(
        state => state && state.chatReducer && state.chatReducer.chats
    );

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;

        // elemRef.current.scrollTo(0, 20);
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
                    <div className="chat2"></div>
                    Chat Room
                    <div className="chat3"></div>
                </h1>
                <div ref={elemRef} className={classes.newScrolling}>
                    <div id="chatScroll" className={classes.chatScroll}>
                        <div className={classes.chatScrollBackground}>
                            {chatMessages.map(item => (
                                <div key={`chat_id_${item.id}`}>
                                    <ChatMessage {...item} />
                                </div>
                            ))}
                        </div>
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
    chatScroll: { padding: "50px" },
    chatRoom: {
        position: "relative",
        width: "80.5%",
        left: "50%",
        transform: "translate(-50%, 0%)",
        textAlign: "center"
    },
    textField: {
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "200px"
    },
    newScrolling: {
        position: "absolute",
        width: "100%",
        height: "71%",
        zIndex: "100",
        overflowY: "scroll"
    }
}));
