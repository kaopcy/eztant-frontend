import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ResponsiveProvider } from "./composables/context/useResponsive";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <ResponsiveProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ResponsiveProvider>
        </Provider>
    </QueryClientProvider>,
    document.getElementById("root")
);
