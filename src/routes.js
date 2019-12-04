import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "./components/welcome";
import Users from "./pages/findUsers";
import { App } from "./components/app";
import OtherProfile from "./components/otherprofile";
import Header from "./components/header";
import Status from "./pages/status";

const Home = props => <App {...props} />;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            userId: null, // TODO: touto prepi na to valume se session i cookie, g na miniski meta p refreash
            showHeader: true
        };

        this.setUserId = this.setUserId.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setHeaderVisibility = this.setHeaderVisibility.bind(this);
    }

    setHeaderVisibility(flag) {
        // console.log("setHeaderVisibility");
        this.setState({ showHeader: flag });
    }

    setUserId(id) {
        // console.log("setUserId");
        this.setState({ userId: id });
    }

    setImage(image) {
        // console.log("setImage");
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
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
