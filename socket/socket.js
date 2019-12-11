import * as io from "socket.io-client";
import { getLastestMessageAction } from "../src/redux/actions/chat.actions";
import { instertNewMessage } from "../src/redux/actions/chat.actions";

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
    }
};
