import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CreatePostMobile = () => {
    const navigate = useNavigate();
    return (
        <div className="flex w-full flex-col items-center text-base text-text">
            <FontAwesomeIcon
                onClick={() =>  navigate(-1)}
                icon={faArrowLeft}
                className="mt-10 ml-7 cursor-pointer self-start rounded-full p-3 hover:bg-gray-100 "
            />
            <Outlet />
        </div>
    );
};

export default CreatePostMobile;
