import React from "react";
import axios from "../axios";
import { Friendshipbutton } from "./friendship";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/user.json/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (this.props.match.params.id == this.state.userId) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        imageUrl: data.image,
                        bio: data.bio,
                        userId: data.meId
                    });
                }
            });
    }

    render() {
        if (!this.state.firstname) {
            return <h1>The user does not exist get over it</h1>;
        }
        return (
            <div>
                <h1>
                    {this.state.firstname} {this.state.lastname}
                </h1>
                <img src={this.state.imageUrl} />
                <p>{this.state.bio}</p>
                <Friendshipbutton otherId={this.props.match.params.id} />
            </div>
        );
    }
}
