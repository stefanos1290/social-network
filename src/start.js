import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.querySelector("main")
);
