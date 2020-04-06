import React from "react";
import axios from "../axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit Bio",
            bio: "",
        };
        this.toggleTextArea = this.toggleTextArea.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    toggleTextArea() {
        this.setState({
            editingMode: !this.state.editingMode,
        });
    }
    setBio(e) {
        e.persist();
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
            [e.target.name]: e.target.value,
        });
    }

    render() {
        const { classes } = this.props;
        let buttonText;
        this.props.bio ? (buttonText = "Edit bio") : (buttonText = "Add bio");
        if (this.state.editingMode) {
            return (
                <div>
                    <div id="textFieldBio">
                        <TextField
                            name="bio"
                            onChange={(e) => this.handleChangeBio(e)}
                            defaultValue={this.props.bio}
                            label="Add Bio Here"
                            InputProps={{ className: classes.input }}
                        />
                    </div>
                    <Button
                        id="saveBioButton"
                        className={classes.buttonSave}
                        variant="contained"
                        color="primary"
                        onClick={this.setBio}
                    >
                        Save
                    </Button>
                </div>
            );
        } else {
            return (
                <div>
                    <div
                        style={{ visibility: "visible" }}
                        className={classes.container}
                    >
                        <div
                            id="textBioContainer"
                            className={classes.textContainer}
                        >
                            {this.props.bio === "" ? (
                                <h3 className="bioText">No Bio added yet</h3>
                            ) : (
                                <h3 className="bioText">{this.props.bio}</h3>
                            )}
                        </div>
                        <Button
                            id="addBioButton"
                            className={classes.buttonAdd}
                            variant="contained"
                            color="primary"
                            onClick={this.toggleTextArea}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

const styles = (theme) => ({});

export default withStyles(styles)(BioEditor);
