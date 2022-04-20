import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { useResponsive } from "./composables/context/useResponsive";
import { useSelector } from "react-redux";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LoginDesktop, LoginMobile } from "./views/login";
import { RegisterDesktop, RegisterMobile } from "./views/register";
import UserTeacherList from "./views/userList/UserTeacherList";
import UserStudentList from "./views/userList/UserStudentList";

import Navbar from "./component/navbar/Navbar";
const PreviewPost = React.lazy(() => import("./views/createPost/PreviewPost"));
const PostList = React.lazy(() => import("./views/mainpost/PostList"));
const Home = React.lazy(() => import("./views/home/Home"));
const CreatePost = React.lazy(() => import("./views/createPost/CreatePost"));
const FillDetail = React.lazy(() => import("./views/createPost/FillDetail"));
const FillTable = React.lazy(() => import("./views/createPost/FillTable"));
const RequestList = React.lazy(() => import("./views/RequestList/RequestList"));

const ProtectedRoute = ({ isAuth, children }) => {
    const { user } = useSelector(state => state.user);
    return <Suspense fallback={<div></div>}>{user ? children : <Navigate to="/" />}</Suspense>;
};

const UnprotectedRoute = ({ children }) => {
    return <Suspense fallback={<div></div>}>{children}</Suspense>;
};

const TeacherOnlyRoute = ({ children }) => {
    const { user } = useSelector(state => state.user);
    return <Suspense fallback={<div></div>}>{user.role === "teacher" ? children : <Navigate to={"/"} />}</Suspense>;
};

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useResponsive();
    const state = location.state;

    // prevent user access some route without background state
    useEffect(() => {
        ScrollTrigger.refresh();
        if (isMobile) return;
        const isIllegalRoute = location.pathname === "/register" || location.pathname === "/login";
        if (!state?.backgroundLocation && isIllegalRoute) {
            navigate("/");
        }
    }, [state?.backgroundLocation, location.pathname, navigate, isMobile]);

    return (
        <div className="m-0 flex flex-col bg-white p-0">
            <Navbar height={80} />
            <div className={`${isMobile ? "h-[60px]" : "h-[80px]"}`}></div>
            {/* this logic used for when not in mobile we want to render background for register */}
            <Routes location={!isMobile ? state?.backgroundLocation : null || location}>
                <Route index path="/" element={<UnprotectedRoute children={<Home />} />} />
                <Route path="/post-list/:id" element={<ProtectedRoute children={<PostList />} />} />
                <Route path="/user-teacher-list" element={<ProtectedRoute children={UserTeacherList} />} />
                <Route path="/user-student-list" element={<ProtectedRoute children={UserStudentList} />} />
                <Route path="/create-post" element={<ProtectedRoute children={<CreatePost />} />}>
                    <Route element={<ProtectedRoute children={<FillDetail />} />} index />
                    <Route path="/create-post/fill-table" element={<ProtectedRoute children={<FillTable />} />} />
                    <Route path="/create-post/preview-post" element={<ProtectedRoute children={<PreviewPost />} />} />
                </Route>
                <Route path="request-list" element={<TeacherOnlyRoute children={<RequestList />} />} />
                <Route path="/post-list/" element={<ProtectedRoute children={<Navigate to="/post-list/all-department" replace />} />} />
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
