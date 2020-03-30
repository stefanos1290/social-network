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
            <div className="headerContainer">
                <div className="logout" onClick={this.logout}>
                    LOG OUT
                </div>
                <div>
                    <div className="linksContainer">
                        {this.props.onlineUsers > 1 && (
                            <Link
                                style={{
                                    fontFamily: "monospace",
                                    textDecoration: "none",
                                    marginRight: "15px"
                                }}
                                to="/onlineusers"
                            >
                                {this.props.onlineUsers} Users Online
                            </Link>
                        )}
                        <Link className="profileLink" to="/">
                            PROFILE
                        </Link>
                        <Link className="chatLink" to="/chat">
                            CHAT
                        </Link>
                        <Link className="findPeopleLink" to="/users">
                            FIND PEOPLE
                        </Link>
                        <Link className="friendsLink" to="/friends">
                            FRIENDS
                        </Link>
                    </div>
                    <div onClick={this.toggleModal} className="uploadPic">
                        UPLOAD
                    </div>
                </div>
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
