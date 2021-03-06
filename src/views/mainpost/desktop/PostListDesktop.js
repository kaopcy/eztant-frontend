import React, { useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import useSearchQuery from "../../../composables/useSearchQuery";
import { useMediaQuery } from "react-responsive";

import PostDesktop, { PostFallBack } from "./components/PostDesktop";
import DepartmentPanel from "./components/DepartmentPanel";
import SortPanel from "./components/SortPanel";
import Pagination from "../../../component/Pagination";
import ApplyPopup from "./components/ApplyPopup";

const PostListDesktop = ({ postList, isLoading }) => {
    gsap.registerPlugin(ScrollToPlugin);

    const { appendQuery, query } = useSearchQuery();
    const page = query.page || 1;

    const isHideSortPanel = useMediaQuery({ query: "(max-width: 1180px)" });
    const isDepartmentPanel = useMediaQuery({ query: "(max-width: 980px)" });

    const [selectedPost, setSelectedPost] = useState(null);

    const documentHeight = () => {
        var body = document.body,
            html = document.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    };

    const scrollThenNextPage = newPage => {
        gsap.to(window, {
            duration: window.scrollY < 300 ? window.scrollY / documentHeight() : 1,
            scrollTo: 0,
            ease: "expo.inOut",
            onComplete: () => appendQuery({ page: newPage }),
        });
        return page;
    };

    const scrollThenCallback = (cb = () => {}) => {
        gsap.to(window, {
            duration: window.scrollY < 300 ? window.scrollY / documentHeight() : 1,
            scrollTo: 0,
            ease: "expo.inOut",
            onComplete: () => cb(),
        });
    };

    return (
        <div className="my-10 flex  w-full items-start justify-center space-x-4 ">
            {!isDepartmentPanel && <DepartmentPanel onChangeDepartment={scrollThenCallback} />}
            <div className="flex-col-cen space-y-4 text-text">
                {postList && !isLoading ? (
                    postList.map((post, i) => <PostDesktop post={post} key={post.subjectID} setSelectedPost={setSelectedPost} />)
                ) : (
                    <>
                        <PostFallBack />
                        <PostFallBack />
                        <PostFallBack />
                    </>
                )}
                {<Pagination currentPage={page} setPage={scrollThenNextPage} />}
            </div>
            {!isHideSortPanel && <SortPanel setPage={scrollThenCallback} />}
            {selectedPost && <ApplyPopup setSelectedPost={setSelectedPost} selectedPost={selectedPost} />}
        </div>
    );
};

export default PostListDesktop;
