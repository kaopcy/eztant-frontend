import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { useResponsive } from "./composables/context/useResponsive";
import { useSelector, useDispatch } from "react-redux";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LoginDesktop, LoginMobile } from "./views/login";
import { RegisterDesktop, RegisterMobile } from "./views/register";

import Navbar from "./component/navbar/Navbar";

import { getUser } from "./store/actions/authAction";

const PostList = React.lazy(() => import("./views/mainpost/PostList"));
const Home = React.lazy(() => import("./views/home/Home"));

// UserList page
const UserTeacherList = React.lazy(() => import("./views/userList/UserTeacherList/UserTeacherList"));
const UserStudentList = React.lazy(() => import("./views/userList/UserStudentList/UserStudentList"));

// UserDetail page
const DetailStudentClick = React.lazy(() => import("./views/userdetail/Detail_StudentClick/TA_detail"));
const DetailTeacherClick = React.lazy(() => import("./views/userdetail/Detail_TeacherClick/Teacher_detail"))

// Error page
const Error = React.lazy(() => import("./views/errorPage/error"))

// CratePost page
const CreatePost = React.lazy(() => import("./views/createPost/CreatePost"));
const FillDetail = React.lazy(() => import("./views/createPost/FillDetail"));
const FillTable = React.lazy(() => import("./views/createPost/FillTable"));
const PreviewPost = React.lazy(() => import("./views/createPost/PreviewPost"));

// RequestList page
const RequestList = React.lazy(() => import("./views/RequestList/RequestList"));

// Community page
const Community = React.lazy(() => import("./views/Community/Community"));
const CommunityReceipt = React.lazy(() => import("./views/Community/CommunityReceipt/CommunityReceipt"));
const CommunityHome = React.lazy(() => import("./views/Community/CommunityHome/CommunityHome"));
const CommunityAttendance = React.lazy(() => import("./views/Community/CommunityAttendance/CommunityAttendance"));
const CommunityFile = React.lazy(() => import("./views/Community/CommunityFile/CommunityFile"));

// user profile page
const ProfileTeacher = React.lazy(() => import("./views/Profile/Teacher/ProfileTeacher"));
const ProfileStudent = React.lazy(() => import("./views/Profile/Student/ProfileStudent"));

const ProtectedRoute = ({ isAuth, children }) => {
    const { user } = useSelector(state => state.user);
    return <Suspense fallback={<div></div>}>{user ? children : <Navigate to="/" />}</Suspense>;
};

const UnprotectedRoute = ({ children }) => {
    return <Suspense fallback={<div></div>}>{children}</Suspense>;
};

const TeacherOnlyRoute = ({ children }) => {
    const { user } = useSelector(state => state.user);
    return <Suspense fallback={<div></div>}>{user && user.role === "teacher" ? children : <Navigate to={"/"} />}</Suspense>;
};
const StudentOnlyRoute = ({ children }) => {
    const { user } = useSelector(state => state.user);
    return <Suspense fallback={<div></div>}>{user && user.role === "student" ? children : <Navigate to={"/"} />}</Suspense>;
};

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;

    const { user } = useSelector(state => state.user);
    const firstCommunity = user?.community?.[0]?.id || "no-community";
    const isMobile = useResponsive();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

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
        <div className="m-0 flex flex-col  p-0">
            <Navbar height={80} />
            <div className={`${isMobile ? "h-[60px]" : "h-[80px]"}`}></div>
            {/* this logic used for when not in mobile we want to render background for register */}
            <Routes location={!isMobile ? state?.backgroundLocation : null || location}>
                <Route index path="/" element={<UnprotectedRoute children={<Home />} />} />

                <Route path="*" element={<UnprotectedRoute children={<Error />} />} />

                <Route path="/post-list/:id" element={<ProtectedRoute children={<PostList />} />} />
                <Route path="/post-list/" element={<ProtectedRoute children={<Navigate to="/post-list/all-department" replace />} />} />

                <Route path="/user-teacher-list" element={<ProtectedRoute children={<UserTeacherList />} />} />
                <Route path="/user-student-list" element={<ProtectedRoute children={<UserStudentList />} />} />

                <Route path="/TA-detail" element={<ProtectedRoute children={<DetailStudentClick />} />} />
                <Route path="/TA-teacherViewDetail" element={<ProtectedRoute children={<DetailTeacherClick />} />} />

                <Route path="/create-post" element={<ProtectedRoute children={<CreatePost />} />}>
                    <Route element={<ProtectedRoute children={<FillDetail />} />} index />
                    <Route path="/create-post/fill-table" element={<ProtectedRoute children={<FillTable />} />} />
                    <Route path="/create-post/preview-post" element={<ProtectedRoute children={<PreviewPost />} />} />
                </Route>

                <Route path="request-list" element={<TeacherOnlyRoute children={<RequestList />} />} />

                <Route path="community" element={<ProtectedRoute children={<Navigate to={`/community/${firstCommunity}`} replace />} />} />
                <Route path="community/:id" element={<ProtectedRoute children={<Community />} />}>
                    <Route path="/community/:id/attendance" element={<ProtectedRoute children={<CommunityAttendance />} />} />
                    <Route path="/community/:id/receipt" element={<ProtectedRoute children={<CommunityReceipt />} />} />
                    <Route path="/community/:id/file" element={<ProtectedRoute children={<CommunityFile />} />} />
                    <Route index element={<ProtectedRoute children={<CommunityHome />} />} />
                </Route>

                <Route path="/profile/student" element={<StudentOnlyRoute children={<ProfileStudent />} />} />
                <Route path="/profile/teacher" element={<TeacherOnlyRoute children={<ProfileTeacher />} />} />

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
