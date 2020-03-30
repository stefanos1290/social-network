import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedImage: ""
        };
        this.changeImageHandler = this.changeImageHandler.bind(this);
    }

    changeImageHandler(e) {
        const file = e.target.files[0];
        if (file) {
            this.setState({ uploadedImage: file });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.container}></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className={classes.modal}>
                        <h2 className={classes.title}>
                            Want to change your image?
                        </h2>
                        <div className={classes.buttonsContainer}>
                            <input
                                onChange={this.changeImageHandler}
                                className="chooseFile"
                                type="file"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
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

const styles = theme => ({
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        opacity: "0.8",
        background: "lightgray"
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
        zIndex: 1000
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-around"
    },
    title: {
        position: "absolute",
        top: "10px",
        color: "white"
    },
    icon: {
        border: "1px solid black"
    },
    close: {
        position: "absolute",
        right: "40px"
    }
});

export default withStyles(styles)(Uploader);
