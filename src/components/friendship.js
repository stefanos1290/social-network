import React, { useState, useEffect } from "react";
import axios from "../axios";

export function Friendshipbutton({ otherId }) {
    const [buttonText, setButtonText] = useState("Make Friend Request");

    useEffect(() => {
        const getStatus = async () => {
            try {
                const { data } = await axios.get(
                    "/friendshipstatus/" + otherId
                );
                setButtonText(data.buttonText);
            } catch (e) {
                console.error(e);
            }
        };
        getStatus();
    }, []);

    function submit() {
        // console.log("clicked on the button", buttonText);
        axios
            .post("/friendshipstatus/" + otherId)
            .then(res => {
                // console.log("submit post axios res: ", res.data);
                setButtonText(res.data.buttontext);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <button onClick={submit}>{buttonText}</button>
        </div>
    );
}
