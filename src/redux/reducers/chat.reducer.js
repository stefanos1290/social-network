export const initialState = {
    chats: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "GET_LATEST_MESSAGES": {
            const { data } = action;
            return {
                ...state,
                chats: [...data]
            };
        }
        case "INTERT_NEW_MESSAGE": {
            const { data } = action;
            return {
                ...state,
                chats: [...state.chats, data]
            };
        }
        default: {
            return state;
        }
    }
}
