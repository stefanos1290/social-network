import React from "react";
import axios from "../axios";
import { Profile } from "./profiles";
import { Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            firstName: "",
            lastName: "",
            uploaderIsVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        axios.get("/getuserdata").then((response) => {
            this.setState({
                loaded: true,
                firstName: response.data.firstname,
                lastName: response.data.lastname,
                bio: response.data.bio,
            });
            this.props.setUserId(response.data.id);
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateBio(bio) {
        this.setState({
            bio: bio,
        });
    }
    render() {
        if (!this.state.loaded) {
            return (
                <div>
                    {" "}
                    <CircularProgress
                        style={{
                            width: "300px",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "calc(-50%, -50%)",
                        }}
                        color="secondary"
                    />
                </div>
            );
        }
        return (
            <div>
                <Profile
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    imageUrl={this.props.imageUrl}
                    bio={this.state.bio}
                    updateBio={this.updateBio}
                />
            </div>
        );
    }
}
