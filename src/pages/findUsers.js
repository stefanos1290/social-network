import React, { useEffect, useState } from "react";
import axios from "../axios";

const User = props => {
    return (
        <div style={{ display: "flex" }}>
            <img
                style={{ width: "100px", height: "100px" }}
                src={props.image}
            />
            <div style={{ fontSize: "25px", textAlign: "center" }}>
                {props.firstname} {props.lastname}
            </div>
        </div>
    );
};

export default () => {
    const [user, setUser] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [value, setValue] = useState("");
    const [loadUsers, setLoadUsers] = useState(false);

    useEffect(() => {
        if (!loadUsers) {
            return;
        }
        async function fetchData() {
            try {
                const { data } = await axios.post("/users", { value: value });
                setUser(data);
                setHasError(false);
            } catch (error) {
                setHasError(true);
            } finally {
                setLoadUsers(false);
            }
        }
        fetchData();
    }, [loadUsers]);

    return (
        <div>
            <h1>Search for {value}</h1>
            <hr />
            <div>
                <input value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={() => setLoadUsers(true)}>Search</button>
                <button onClick={() => setUser([])}>Clear</button>
            </div>
            <div>{hasError && <div>error</div>}</div>
            <div>
                {user
                    .sort()
                    .slice(0, 5)
                    .map(user => {
                        return (
                            <div key={user.id}>
                                <User {...user} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
