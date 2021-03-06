const getStore = state => state.friendsReducer;

export const getAllFriends = state =>
    getStore(state).users.filter(friend => friend.accepted === true);

export function getOnline(state) {
    console.log(state);
}
