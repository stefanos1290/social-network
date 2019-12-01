import React from "react";
import axios from "../axios";
import { ProfilePic } from "./profile";
import Uploader from "./uploader";
import { Profile } from "./profiles";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            firstName: "",
            lastName: "",
            uploaderIsVisible: false,
            imageUrl: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.replacePicture = this.replacePicture.bind(this);
        this.logout = this.logout.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        console.log("app mounted");
        axios.get("/getuserdata").then(response => {
            this.setState({
                loaded: true,
                firstName: response.data.firstname,
                lastName: response.data.lastname,
                imageUrl: `./${response.data.image}`
            });
        });
        //this is where we want to contact the server and ask for info about the user
        //axios.get()
        //when we get the info back, we want to add it to state
        //this.setState({});
    }

    toggleModal() {
        console.log("toggle modal is running");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    replacePicture(file) {
        //this.setState({ imageUrl: src });
        const data = new FormData();
        data.append("file", file);
        axios
            .post("http://localhost:8080/upload", data, {
                // receive two parameter endpoint url ,form data
            })
            .then(res => {
                this.setState({
                    imageUrl: `./${res.data.filename}`,
                    uploaderIsVisible: false
                });
                // then print response status
            });
    }

    updateBio(bio) {
        this.setState(
            {
                bio: bio
            },
            () => {
                console.log("update bio: ", this.state.bio);
            }
        );
    }

    logout() {
        axios.post("/logout");
        location.replace("/welcome");
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <div>
                    <img
                        onClick={this.logout}
                        style={{
                            width: "100px",
                            borderRadius: "50px"
                        }}
                        src="logo.jpg"
                    ></img>
                    <img
                        onClick={this.toggleModal}
                        style={{
                            width: "80px",
                            borderRadius: "50px",
                            position: "absolute",
                            right: "20px",
                            top: "20px"
                        }}
                        src={this.state.imageUrl}
                    />
                    <hr />
                </div>
                <div>
                    <h1>app page</h1>
                    <Profile
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        imageUrl={this.state.imageUrl}
                        bio={this.state.bio}
                        updateBio={this.updateBio}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            replaceImage={this.replacePicture}
                            toggleModal={this.toggleModal}
                        />
                    )}
                </div>
            </div>
        );
    }
}
