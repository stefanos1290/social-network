export const getLastestMessageAction = data => {
    return {
        type: "GET_LATEST_MESSAGES",
        data
    };
};
export const instertNewMessage = data => {
    return {
        type: "INTERT_NEW_MESSAGE",
        data
    };
};
