import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ResponsiveProvider } from "./composables/context/useResponsive";
import "./index.css";

ReactDOM.render(
    <ResponsiveProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ResponsiveProvider>,
    document.getElementById("root")
);
