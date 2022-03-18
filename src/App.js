import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./views/login/Login";
import RegisterModal from "./views/register/Register";
import Home from "./views/home/Home";

import Navbar from "./component/navbar/Navbar";
import { useMediaQuery } from "react-responsive";

const App = () => {
    const location = useLocation();
    const isMobile = useMediaQuery({ query: "(max-width: 648px)" });
    const backgroundLocation = location.state || null;
    return (
        <div className="m-0 flex flex-col bg-slate-50 p-0">
            <Navbar height={80} />
            <div className={`${isMobile ? 'h-[60px]' : 'h-[80px]'}`}></div>
            {/* this logic used for when not in mobile we want to render background for register */}
            <Routes
                location={!isMobile ? backgroundLocation : null || location}
            >
                <Route index path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                {isMobile && <Route path="/register" element={<RegisterModal />} />}
            </Routes>

            {backgroundLocation && !isMobile && (
                <Routes>
                    <Route path="/register" element={<RegisterModal />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
