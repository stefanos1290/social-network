import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/routes";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducers";
import { Provider } from "react-redux";
import { init } from "../socket/socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
init(store);
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.querySelector("main")
);
