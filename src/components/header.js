import React from "react";
import axios from "../axios";
import Uploader from "./uploader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MenuItem from "@material-ui/core/MenuItem";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            setAnchorEl: null
        };
        this.logout = this.logout.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.replacePicture = this.replacePicture.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    handleClick(e) {
        this.setState({
            setAnchorEl: e.currentTarget
        });
    }
    handleClose() {
        this.setState({
            setAnchorEl: null
        });
    }

    render() {
        const open = Boolean(this.state.setAnchorEl);
        return (
            <div className="headerContainer">
                <div className="logout" onClick={this.logout}>
                    LOG OUT
                </div>
                <div>
                    <div id="menuIcon">
                        <DehazeIcon
                            style={{ fill: "white" }}
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        ></DehazeIcon>
                        <Menu
                            id="fade-menu"
                            anchorEl={this.state.setAnchorEl}
                            keepMounted
                            open={open}
                            TransitionComponent={Fade}
                            onClose={this.handleClose}
                        >
                            {this.props.onlineUsers > 1 && (
                                <MenuItem>
                                    <Link id="menuItems" to="/onlineusers">
                                        see {this.props.onlineUsers} Users
                                        Online
                                    </Link>
                                </MenuItem>
                            )}
                            <MenuItem>
                                <Link id="menuItems" to="/">
                                    PROFILE
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                {" "}
                                <Link id="menuItems" to="/chat">
                                    CHAT
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link id="menuItems" to="/users">
                                    FIND PEOPLE
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link id="menuItems" to="/friends">
                                    FRIENDS
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="linksContainer">
                        {this.props.onlineUsers > 1 && (
                            <Link className="seeOnlineLink" to="/onlineusers">
                                see {this.props.onlineUsers} Users Online
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
