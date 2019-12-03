import React, { useState, useEffect } from "react";

export default () => {
    const [name, setName] = useState("andreas");

    useEffect(() => {
        console.log("Hit");
    }, []);

    useEffect(() => {
        console.log("hit name");
    }, [name]);

    return (
        <div>
            Hello {name}
            <input value={name} onChange={e => setName(e.target.value)} />
        </div>
    );
};
