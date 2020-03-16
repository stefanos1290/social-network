import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

const User = props => {
    return (
        <div style={{ display: "flex", marginTop: "10px" }}>
            <Link to={`/user/${props.id}`}>
                <img
                    style={{ width: "100px", height: "100px" }}
                    src={props.image}
                />
            </Link>
            <div
                style={{
                    fontSize: "25px",
                    textAlign: "center",
                    margin: "17px"
                }}
            >
                {props.firstname} {props.lastname}
            </div>
            <p>{props.bio}</p>
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
            <div>
                <input value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={() => setLoadUsers(true)}>Search</button>
                <button onClick={() => setUser([])}>Clear</button>
            </div>
            <div>
                {hasError && (
                    <div
                        style={{
                            fontSize: "100px",
                            color: "red"
                        }}
                    >
                        Error
                    </div>
                )}
            </div>
            <div>
                {user
                    .sort()
                    .slice(0, 6)
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
