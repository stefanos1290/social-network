import * as io from "socket.io-client";
import {
    getLastestMessageAction,
    instertNewMessage
} from "../src/redux/actions/chat.actions";

import {
    seeOnlineUsers,
    getOnlineData
} from "../src/redux/actions/friends.actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgs => {
            store.dispatch(getLastestMessageAction(msgs));
        });
        socket.on("chatMessage", msg => {
            store.dispatch(instertNewMessage(msg));
        });
        socket.on("connectedUsers", noOfUsers => {
            store.dispatch(seeOnlineUsers(noOfUsers));
        });
        socket.on("connectedUsersDisconnect", noOfUsers => {
            store.dispatch(seeOnlineUsers(noOfUsers));
        });
        socket.on("dataOnlineUser", userInfo => {
            console.log("userInfo", userInfo);
            store.dispatch(getOnlineData(userInfo));
        });
    }
};
