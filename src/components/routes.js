import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "./welcome";
import Users from "./findUsers";
import { App } from "./app";
import OtherProfile from "./otherprofile";
import Header from "./header";
import NewFriends from "./friends";
import { Chat } from "./chat";
import OnlineUsers from "./onlineUsers";

const Home = props => <App {...props} />;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            userId: null,
            showHeader: true
        };

        this.setUserId = this.setUserId.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setHeaderVisibility = this.setHeaderVisibility.bind(this);
    }

    setHeaderVisibility(flag) {
        this.setState({ showHeader: flag });
    }

    setUserId(id) {
        this.setState({ userId: id });
    }

    setImage(image) {
        this.setState({ image: image });
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <div>
                            <div
                                style={{
                                    display: this.state.showHeader
                                        ? "block"
                                        : "none"
                                }}
                            >
                                <Header
                                    imageUrl={this.state.image}
                                    setImage={imageUrl => {
                                        this.setImage(imageUrl);
                                    }}
                                />
                            </div>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <Home
                                    imageUrl={this.state.image}
                                    setUserId={id => this.setUserId(id)}
                                />
                            </Route>
                            <Route exact path="/users">
                                <Users />
                            </Route>
                            <Route exact path="/welcome">
                                <Welcome
                                    setHeaderVisibility={f =>
                                        this.setHeaderVisibility(f)
                                    }
                                />
                            </Route>
                            <Route
                                exact
                                path="/user/:id"
                                component={props => (
                                    <OtherProfile
                                        {...props}
                                        userId={this.state.userId}
                                    />
                                )}
                            />
                            <Route exact path="/friends">
                                <NewFriends />
                            </Route>
                            <Route exact path="/chat">
                                <Chat />
                            </Route>
                            <Route exact path="/onlineusers">
                                <OnlineUsers />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
