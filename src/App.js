import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginDesktop from "./views/login/LoginDesktop";
import LoginMobile from "./views/login/LoginMobile";
import RegisterDesktop from "./views/register/RegisterDesktop";
import RegisterMobile from "./views/register/RegisterMobile";
import Home from "./views/home/Home";

import Navbar from "./component/navbar/Navbar";
import { useMediaQuery } from "react-responsive";

const App = () => {
    const location = useLocation();
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const backgroundLocation = location.state || null;
    return (
        <div className="m-0 flex flex-col bg-slate-50 p-0">
            <Navbar height={80} />
            <div className={`${isMobile ? "h-[60px]" : "h-[80px]"}`}></div>

            {/* this logic used for when not in mobile we want to render background for register */}
            <Routes
                location={!isMobile ? backgroundLocation : null || location}
            >
                <Route index path="/" element={<Home />} />
                {isMobile && (
                    <>
                        <Route path="/register" element={<RegisterMobile />} />
                        <Route path="/login" element={<LoginMobile />} />
                    </>
                )}
            </Routes>

            {backgroundLocation && !isMobile && (
                <Routes>
                    <Route path="/register" element={<RegisterDesktop />} />
                    <Route path="/login" element={<LoginDesktop />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
