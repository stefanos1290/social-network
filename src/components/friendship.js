import React, { useState, useEffect } from "react";
import axios from "../axios";

export function Friendshipbutton({ otherId }) {
    console.log("otherId: ", otherId);
    const [buttonText, setButtonText] = useState("buttonText test");

    useEffect(() => {
        axios.get(`/friendshipstatus/${otherId}`).then(res => {
            console.log("res: ", res.data);
            setButtonText(res.data.buttonText);
        });
    }, []);

    function submit() {
        console.log("click ", buttonText);
        // we can do the logic here, and then send to one o 3 defferent post routes
        // or we can make a post request to 1 route, and the route does the logic to determin what type of query to make
    }

    return (
        <div>
            <button onClick={submit}>{buttonText}</button>
        </div>
    );
}
