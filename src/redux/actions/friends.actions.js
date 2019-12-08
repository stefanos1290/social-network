import axios from "../../axios";

export const RECEIVE_USER_TYPE = "RECEIVE_USERS";
export const MAKE_FRIEND = "MAKE_FRIEND";
export const UNFRIEND = "UNFRIEND";

export async function receiveUsers() {
    try {
        const { data } = await axios.get("/get-user-wannabes");
        return {
            type: RECEIVE_USER_TYPE,
            users: data.data
        };
    } catch (err) {
        console.log(err);
    }
}

export async function makeFriend(id) {
    try {
        await axios.post("/friendshipstatus/accept/" + id);
        return {
            type: MAKE_FRIEND,
            id
        };
    } catch (err) {
        console.log(err);
    }
}

export async function unfriend(id) {
    try {
        await axios.post("/friendshipstatus/cancel/" + id);
        return {
            type: UNFRIEND,
            id
        };
    } catch (err) {
        console.log(err);
    }
}
