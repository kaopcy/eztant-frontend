import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./views/login/Login";
import RegisterModal from "./views/register/Register";
import Home from "./views/home/Home";

import Navbar from "./component/navbar/Navbar";

const App = () => {
    const location = useLocation();
    const backgroundLocation = location.state || null;
    return (
        <div className="m-0 bg-slate-50 p-0 flex flex-col">
            <Navbar height="80px" />
            <div className="h-[80px]" ></div>
            <Routes location={backgroundLocation || location}>
                <Route index path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
            </Routes>

            {backgroundLocation && (
                <Routes>
                    <Route path="/register" element={<RegisterModal />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
