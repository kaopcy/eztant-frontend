import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/Home";

import Navbar from "./component/navbar/Navbar";
import Modal from "./component/modal/Modal";

const App = () => {
    return (
        <div className="min-h-screen w-screen">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
            </Routes>
            <Modal>
                coooolllll
            </Modal>
        </div>
    );
};

export default App;
