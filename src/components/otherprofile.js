import React from "react";
import axios from "../axios";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //we waant to make a request to the server, passing along this,props.match.params.id
        //the server needs to look up the data about that user
        //AND send back information about the currently logged in user.
        //we need to figure out if the other users id is the same as thw logged in users id..
        //IF ut us then send them away....
        if (!this.props.userId) {
            this.props.history.push("/");
        }

        if (this.props.match.params.id === this.props.userId) {
            this.props.history.push("/");
        }

        axios
            .get("/getuserdata/" + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        return (
            <div>
                <h1>I am {this.props.userId}</h1>
                <h1>hello from other profile {this.props.match.params.id}</h1>
            </div>
        );
    }
}
