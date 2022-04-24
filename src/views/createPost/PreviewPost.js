import React, { useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useResponsive } from "../../composables/context/useResponsive";

import { useInput } from "./context/inputCreatePostContext";
import { useTableInput } from "./context/tableCreatePostContext";

import PostMobile from "../mainpost/mobile/components/PostMobile";
import PostDesktop from "../mainpost/desktop/components/PostDesktop";

import { POSTS } from "../../generalConfig";

const PreviewPost = () => {
    const navigate = useNavigate();

    const inputValue = useInput();
    const tableInput = useTableInput();

    const isMobile = useResponsive();

    useEffect(() => {
        if (!inputValue || !tableInput) {
            navigate("/create-post");
        } else {
            POSTS.push({ ...inputValue, ...tableInput });
        }
    }, [inputValue, tableInput, navigate]);

    return (
        <div className="w-full">
            {tableInput &&
                inputValue &&
                (isMobile ? (
                    <div className="flex-col-cen mt-6 w-full space-y-4 text-text pb-20">
                        <PostMobile post={{ ...inputValue, ...tableInput }} />
                        <button type="submit" className="btn-orange flex-col-cen fixed left-0 bottom-0 z-[100] h-14 w-full">
                            <Link to="/post-list" className="text-xl font-bold ">กลับไปหน้ารวมโพสต์</Link>
                        </button>
                    </div>
                ) : (
                    <div className="flex-col-cen mt-6 space-y-4 text-text">
                        <PostDesktop post={{ ...inputValue, ...tableInput }} />
                        <div className="flex w-[768px] space-x-6">
                            <Link
                                to="/create-post"
                                className="btn-white flex-col-cen w-full rounded-md border-2 py-2 text-lg font-bold tracking-wide ">
                                กลับเพื่อเพิ่มโพสต์ใหม่
                            </Link>
                            <Link to="/post-list" className="btn-white flex-col-cen w-full rounded-md border-2 py-2 text-lg font-bold tracking-wide ">
                                ไปยังหน้ารวมโพสต์
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PreviewPost;
