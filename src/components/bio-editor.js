import React from "react";
import axios from "../axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio..."
        };
    }

    componentDidMount() {
        console.log("didMount: ", this.props);
        if (!this.props.bio) {
            console.log("no bio!");
            this.setState(
                {
                    buttonText: "add you Bio"
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
                    <h1>I am in editing mode</h1>
                    <textarea defaultValue={this.props.bio} />
                    <button>Save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>I am the bio editor</h1>
                    <button>{this.state.buttonText}</button>
                </div>
            );
        }
    }
}
