import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { withStyles } from "@material-ui/core/styles";

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
        return (
            <div>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 999,
                        opacity: "0.8",
                        background: "lightgray"
                    }}
                ></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        style={{
                            width: "550px",
                            height: "200px",
                            backgroundColor: "#8ba9b2",
                            position: "absolute",
                            top: "100px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "20px",
                            border: "1px solid black",
                            zIndex: 1000
                        }}
                    >
                        <h2>Want to change your image?</h2>
                        <input
                            onChange={this.changeImageHandler}
                            type="file"
                            style={{
                                width: "100px",
                                border: "1px solid #ccc",
                                display: "inline-block",
                                padding: "6px 12px"
                            }}
                        />
                        <Button onClick={() => this.props.toggleModal()}>
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<CloudUploadIcon />}
                            onClick={() =>
                                this.props.replaceImage(
                                    this.state.uploadedImage
                                )
                            }
                        >
                            UPLOAD
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = theme => ({});

export default withStyles(styles)(Uploader);
