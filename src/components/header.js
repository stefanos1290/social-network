import React from "react";
import axios from "../axios";
import Uploader from "./uploader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.logout = this.logout.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.replacePicture = this.replacePicture.bind(this);
    }

    componentDidMount() {
        axios.get("/getuserdata").then(response => {
            this.props.setImage(`${response.data.image}`);
        });
    }

    replacePicture(file) {
        const data = new FormData();
        data.append("file", file);
        axios.post("http://localhost:8080/upload", data, {}).then(res => {
            this.props.setImage(`./${res.data.filename}`);
            this.setState({
                uploaderIsVisible: false
            });
        });
    }

    logout() {
        axios.post("/logout").then(function() {
            location.replace("/welcome");
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    render() {
        return (
            <div>
                <img
                    onClick={this.logout}
                    style={{
                        width: "100px",
                        borderRadius: "100%"
                    }}
                    src="/logo.jpg"
                ></img>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            right: "115px",
                            top: "45px"
                        }}
                    >
                        <Link style={{ marginRight: "15px" }} to="/onlineusers">
                            see all {this.props.onlineUsers} Online Users
                        </Link>
                        <Link style={{ marginRight: "15px" }} to="/">
                            Profile
                        </Link>
                        <Link style={{ marginRight: "15px" }} to="/chat">
                            Chat
                        </Link>
                        <Link style={{ marginRight: "15px" }} to="/users">
                            Find People
                        </Link>
                        <Link to="/friends">Friends</Link>
                    </div>
                </div>
                <img
                    onClick={this.toggleModal}
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50px",
                        position: "absolute",
                        right: "20px",
                        top: "20px"
                    }}
                    src={`/${this.props.imageUrl}`}
                />
                <hr />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        replaceImage={this.replacePicture}
                        toggleModal={this.toggleModal}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        onlineUsers: state.friendsReducer.onlineUsers
    };
}

const ConnectedHeader = connect(mapStateToProps)(Header);
export default ConnectedHeader;
