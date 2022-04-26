import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useResponsive } from "../../composables/context/useResponsive";

import { useInput } from "./context/inputCreatePostContext";
import { useTableInput } from "./context/tableCreatePostContext";

import PostMobile from "../mainpost/mobile/components/PostMobile";
import PostDesktop from "../mainpost/desktop/components/PostDesktop";

import { POSTS } from "../../generalConfig";
import { useFetchPostByID } from "../../composables/fetch/useFetchPost";
import { castPostFromDatabase } from "../../utils/castDataName";

const PreviewPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isMobile = useResponsive();
    const { data, isLoading, error, mutate } = useFetchPostByID();

    useEffect(() => {
        mutate(id);
    }, [mutate, id]);

    const isReady = useMemo(() => {
        return data && !isLoading;
    }, [data, isLoading]);

    const post = useMemo(() => {
        console.log(data?.data?.posts[0]);
        return data?.data?.posts[0] && castPostFromDatabase(data?.data.posts[0]);
    }, [data]);

    return (
        <div className="w-full">
            {post &&
                (isMobile ? (
                    <div className="flex-col-cen mt-6 w-full space-y-4 pb-20 text-text">
                        <PostMobile post={post} />
                        <button type="submit" className="btn-orange flex-col-cen fixed left-0 bottom-0 z-[100] h-14 w-full">
                            <Link to="/post-list" className="text-xl font-bold ">
                                กลับไปหน้ารวมโพสต์
                            </Link>
                        </button>
                    </div>
                ) : (
                    <div className="flex-col-cen mt-6 space-y-4 text-text">
                        <PostDesktop post={post} />
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
