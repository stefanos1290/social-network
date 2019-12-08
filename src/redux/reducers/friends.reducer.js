import { friendsActions } from "../actions";

export const initialState = {
    users: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case friendsActions.RECEIVE_USER_TYPE: {
            return (state = {
                ...state,
                users: action.users
            });
        }
        case friendsActions.MAKE_FRIEND: {
            return (state = {
                ...state,
                users: state.users.map(user => {
                    if (user.id == action.id) {
                        return {
                            ...user,
                            accepted: true
                        };
                    } else {
                        return user;
                    }
                })
            });
        }
        case friendsActions.UNFRIEND: {
            return (state = {
                ...state,
                users: state.users.map(user => {
                    if (user.id == action.id) {
                        return {
                            ...user,
                            accepted: null
                        };
                    } else {
                        return user;
                    }
                })
            });
        }
        default: {
            return state;
        }
    }
}
