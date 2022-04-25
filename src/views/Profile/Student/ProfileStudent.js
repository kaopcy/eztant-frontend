import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import gsap from "gsap";

import ProfileDetail from "./components/ProfileDetail";
import OwnedPost from "./components/OwnedPost";
import RequestCount from "./components/RequestCount";

const ProfileStudent = () => {
    const [nav, setNav] = useState("profile");
    return (
        <div className="flex min-h-screen w-full flex-col items-center py-8 text-base text-text">
            <ProfileHeader />
            <Navigation nav={nav} setNav={setNav} />
            {nav === "profile" ? <ProfileDetail /> : nav === "request" ? <RequestCount /> : <OwnedPost />}
        </div>
    );
};

const ProfileHeader = () => {
    const { user } = useSelector(state => state.user);

    return (
        <>
            <div className="h-36 w-36 overflow-hidden rounded-full ">
                <img className="h-full w-full object-cover" src={user.imgURL} alt="" />
            </div>
            <div className="mt-4 text-xl font-semibold">
                {user.firstname} {user.lastname}
            </div>
            <div className="text-base">{user.department}</div>
            <div className="text-secondary underline ">{user.email}</div>
        </>
    );
};

const Navigation = ({ nav, setNav }) => {
    const indicatorRef = useRef(null);
    const profileBtn = useRef(null);
    const postBtn = useRef(null);
    const requestBtn = useRef(null);
    useEffect(() => {
        const profileWidth = profileBtn.current.clientWidth;
        const requestWidth = requestBtn.current.clientWidth;
        const postWidth = postBtn.current.clientWidth;
        const width = nav === "profile" ? profileWidth : nav === "request" ? requestWidth : postWidth;
        const left = nav === "profile" ? 0 : nav === "request" ? profileWidth : profileWidth + requestWidth;
        gsap.to(indicatorRef.current, { width, left, ease: "elastic.out(1.5,1)", overwrite: true });
    }, [nav]);
    return (
        <div className="relative mt-10 flex items-center justify-center py-5">
            <div
                ref={profileBtn}
                onClick={() => setNav("profile")}
                className={`cursor-pointer  px-6 text-xl ${nav === "profile" ? "text-primary" : "text-text"}`}>
                ข้อมูลส่วนตัว
            </div>
            <div
                ref={requestBtn}
                onClick={() => setNav("request")}
                className={`cursor-pointer  px-6 text-xl ${nav === "request" ? "text-primary" : "text-text"}`}>
                คำขอสมัครเป็น TA
            </div>
            <div
                ref={postBtn}
                onClick={() => setNav("post")}
                className={`cursor-pointer  px-6 text-xl ${nav === "post" ? "text-primary" : "text-text"}`}>
                โพสต์
            </div>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-200"></div>
            <div ref={indicatorRef} className="absolute bottom-0 left-0 h-[2.5px] w-[100px] bg-primary"></div>
        </div>
    );
};

export default ProfileStudent;
