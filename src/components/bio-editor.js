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
        this.showTextArea = this.showTextArea.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    showTextArea() {
        this.setState({
            editingMode: !this.state.editingMode
        });
    }
    setBio() {
        axios
            .post("/bio", { bio: this.state.bio })
            .then(() => {
                this.props.updateBio(this.state.bio);
                this.showTextArea();
            })
            .catch();
    }

    handleChangeBio(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        console.log("didMount: ", this.props);
        if (!this.props.bio) {
            console.log("no bio!");
            this.setState(
                {
                    buttonText: "add your Bio"
                },
                () => {
                    console.log("this.state: ", this.state);
                }
            );
        }
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div>
                    <textarea
                        name="bio"
                        onChange={e => this.handleChangeBio(e)}
                        defaultValue={this.props.bio}
                    />
                    <button onClick={this.setBio}>Save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>{this.props.bio}</h1>
                    <button onClick={this.showTextArea}>
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
