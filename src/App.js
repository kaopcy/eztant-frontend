import React, { useEffect } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { LoginDesktop, LoginMobile } from "./views/login";
import { RegisterDesktop, RegisterMobile } from "./views/register";

import Home from "./views/home/Home";

import Navbar from "./component/navbar/Navbar";
import { useResponsive } from "./composables/context/useResponsive";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useResponsive();
    const state = location.state;

    // prevent user access some route without background state
    useEffect(() => {
        if(isMobile) return
        const isIllegalRoute = location.pathname === "/register" || location.pathname === "/login";
        if (!state?.backgroundLocation && isIllegalRoute) {
            navigate("/");
        }
    }, [state?.backgroundLocation, location.pathname, navigate , isMobile]);

    return (
        <div className="m-0 flex flex-col bg-slate-50 p-0">
            <Navbar height={80} />
            <div className={`${isMobile ? "h-[60px]" : "h-[80px]"}`}></div>

            {/* this logic used for when not in mobile we want to render background for register */}
            <Routes location={!isMobile ? state?.backgroundLocation : null || location}>
                <Route path="/post" element={<RegisterMobile />} />
                <Route index path="/" element={<Home />} />
                {isMobile && (
                    <>
                        <Route path="/register" element={<RegisterMobile />} />
                        <Route path="/login" element={<LoginMobile />} />
                    </>
                )}
            </Routes>

            {state?.backgroundLocation && !isMobile && (
                <Routes>
                    <Route path="/register" element={<RegisterDesktop />} />
                    <Route path="/login" element={<LoginDesktop />} />
                </Routes>
            )}
        </div>
    );
};

export default App;
