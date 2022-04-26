import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from "react";

import gsap from "gsap";
import Post, { PostFallBack } from "../../../mainpost/desktop/components/PostDesktop";
import { v4 as uuid } from "uuid";
import usePostListFetch from "../../../../api/Post/usePostListFetch";
import { useFetchPostByOwnerID } from "../../../../composables/fetch/useFetchPost";
import { useSelector } from "react-redux";
import { castPostFromDatabase } from "../../../../utils/castDataName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const OwnedPost = () => {
    const { mutate, data, error, isLoading } = useFetchPostByOwnerID();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        mutate(user._id);
    }, [mutate, user._id]);

    const posts = useMemo(() => {
        console.log(data?.data?.posts?.map(e => castPostFromDatabase(e)));
        return data?.data?.posts && data?.data?.posts?.map(e => castPostFromDatabase(e));
    }, [data]);

    const container = useRef(null);

    useEffect(() => {
        gsap.fromTo(container.current, { x: gsap.getProperty(container.current, "width") }, { x: 0, ease: "elastic.out(1,1)" });
    }, [posts]);

    return (
        <div className="mt-10 flex w-full flex-col items-center">
            {posts && !isLoading ? (
                posts.length ? (
                    <div className="absolute mt-10 overflow-hidden px-3 pb-20">
                        <div className="" ref={container}>
                            {posts.map(post => (
                                <div key={uuid()}>
                                    <Post post={post} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="absolute mt-10 overflow-hidden px-3">
                        <div ref={container} className="flex flex-col items-center ">
                            <div className="mb-4">ไม่มีโพสต์</div>
                            <div
                                className="btn-white flex items-center space-x-3 rounded-md border-2 px-4 py-2"
                                onClick={() => navigate("/create-post")}>
                                <div className="">สร้างเลย!</div>
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="absolute mt-10 overflow-hidden px-3">
                    <div key={uuid()} ref={container}>
                        <PostFallBack />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnedPost;
