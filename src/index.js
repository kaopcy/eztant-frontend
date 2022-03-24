import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ResponsiveProvider } from "./composables/context/useResponsive";
import { AuthProvider } from "./composables/context/auth";
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <AuthProvider>
            <ResponsiveProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ResponsiveProvider>
        </AuthProvider>
    </Provider>,
    document.getElementById("root")
);
