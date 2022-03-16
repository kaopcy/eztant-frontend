import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./views/login/Login";
import RegisterModal from "./views/register/Register";
import Home from "./views/home/Home";

import Navbar from "./component/navbar/Navbar";

const App = () => {
    const location = useLocation();
    const backgroundLocation = location.state || null
    return (
        <div className="min-h-screen w-screen bg-slate-50">
            <Navbar />
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
