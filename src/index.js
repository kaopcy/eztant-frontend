import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ResponsiveProvider } from "./composables/context/useResponsive";
import { AuthProvider } from "./composables/context/auth";
import "./index.css";

ReactDOM.render(
    <AuthProvider>
        <ResponsiveProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ResponsiveProvider>
    </AuthProvider>,
    document.getElementById("root")
);
