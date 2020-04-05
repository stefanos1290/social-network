import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import BackupIcon from "@material-ui/icons/Backup";
import CloseIcon from "@material-ui/icons/Close";

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = null;
        this.state = {
            uploadedImage: "",
            disabled: true,
        };
        // this.changeImageHandler = this.changeImageHandler.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
    }

    changeImageHandler(e) {
        const file = e.target.files[0];
        if (file) {
            this.setState({ uploadedImage: file });
        }
    }

    handleSaveButton() {
        if (this.inputRef.files.length > 0) {
            this.setState({ disabled: false });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div id="uploaderContainer" className={classes.container}></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div id="uploadModal" className={classes.modal}>
                        <h2 id="uploaderTitle" className={classes.title}>
                            Want to change your image?
                        </h2>
                        <div
                            id="buttonsContainerUploader"
                            className={classes.buttonsContainer}
                        >
                            {" "}
                            <Button
                                id="uploadButton"
                                variant="contained"
                                component="label"
                                color="primary"
                                className={classes.uploadButton}
                                startIcon={<BackupIcon />}
                            >
                                UPLOAD
                                <input
                                    style={{ display: "none" }}
                                    ref={(inputRef) => {
                                        this.inputRef = inputRef;
                                    }}
                                    onChange={(e) => {
                                        this.changeImageHandler(e);
                                        this.handleSaveButton();
                                    }}
                                    className="chooseFile"
                                    type="file"
                                />
                            </Button>
                            <Button
                                id="saveButton"
                                variant="contained"
                                color="primary"
                                size="small"
                                disabled={this.state.disabled}
                                startIcon={<SaveIcon />}
                                onClick={() =>
                                    this.props.replaceImage(
                                        this.state.uploadedImage
                                    )
                                }
                            >
                                SAVE
                            </Button>
                            <Button
                                id="closeButton"
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<CloseIcon />}
                                className={classes.close}
                                onClick={() => this.props.toggleModal()}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = (theme) => ({
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        opacity: "0.8",
        background: "lightgray",
    },
    modal: {
        width: "550px",
        height: "200px",
        backgroundColor: "#303f9f",
        position: "absolute",
        top: "100px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "20px",
        border: "1px solid black",
        zIndex: 1000,
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-around",
    },
    title: {
        position: "absolute",
        top: "10px",
        color: "white",
    },
    icon: {
        border: "1px solid black",
    },
    close: {
        position: "absolute",
        right: "40px",
    },
    uploadButton: {
        position: "absolute",
        left: "40px",
    },
});

export default withStyles(styles)(Uploader);
