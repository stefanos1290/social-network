import React, { useEffect, useState } from "react";
import axios from "../axios";

const User = props => {
    return <div>{props.firstname}</div>;
};

export default () => {
    const [users, setUsers] = useState([]);
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
                setUsers(data);
                setHasError(false);
            } catch (e) {
                setHasError(true);
            } finally {
                setLoadUsers(false);
            }
        }
        fetchData();
    }, [loadUsers]);

    return (
        <div>
            <h1>Users</h1>
            <hr />
            <div>
                <input value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={() => setLoadUsers(true)}>Search</button>
            </div>
            {hasError && <div>ERROR</div>}
            <div>
                {users.map(user => {
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
