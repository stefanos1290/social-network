import React from "react";
import axios from "../axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio",
            bio: ""
        };
        this.toggleTextArea = this.toggleTextArea.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    toggleTextArea() {
        this.setState({
            editingMode: !this.state.editingMode
        });
    }
    setBio() {
        axios
            .post("/bio", { bio: this.state.bio })
            .then(() => {
                this.props.updateBio(this.state.bio);
                this.toggleTextArea();
            })
            .catch();
    }

    handleChangeBio(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        let buttonText;
        this.props.bio
            ? (buttonText = "Edit your bio")
            : (buttonText = "Add your bio");
        if (this.state.editingMode) {
            return (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "200px",
                            left: "285px"
                        }}
                    >
                        <textarea
                            style={{ width: "200px", height: "100px" }}
                            name="bio"
                            onChange={e => this.handleChangeBio(e)}
                            defaultValue={this.props.bio}
                        />
                        <button onClick={this.setBio}>Save</button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "200px",
                            left: "285px"
                        }}
                    >
                        <h3>{this.props.bio}</h3>
                        <button onClick={this.toggleTextArea}>
                            {buttonText}
                        </button>
                    </div>
                </>
            );
        }
    }
}
