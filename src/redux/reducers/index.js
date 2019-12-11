import { combineReducers } from "redux";
import friendsReducer from "./friends.reducer";
import chatReducer from "./chat.reducer";

export default combineReducers({
    friendsReducer,
    chatReducer
});
