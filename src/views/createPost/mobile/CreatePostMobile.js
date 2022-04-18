import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CreatePostMobile = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(pathname);
    });
    return (
        <div className="flex w-full flex-col items-center  px-8 text-base text-text">
            <FontAwesomeIcon
                onClick={() => navigate(-1)}
                icon={faArrowLeft}
                className="mt-10 cursor-pointer self-start rounded-full p-3 hover:bg-gray-100 "
            />
            <Outlet />
            <div
                className="btn-orange flex-col-cen fixed bottom-0 z-[100] h-14 w-full"
                onClick={() => {
                    pathname === "/create-post" ? navigate("fill-table") : navigate("/create-post");
                }}>
                <div className="text-xl font-bold ">ถัดไป</div>
            </div>
        </div>
    );
};

export default CreatePostMobile;
