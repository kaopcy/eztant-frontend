import React, { useContext, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useMediaQuery } from "react-responsive";
import { PageContext } from "../context/PageContext";

import PostDesktop, { PostFallBack } from "./components/PostDesktop";
import DepartmentPanel from "./components/DepartmentPanel";
import SortPanel from "./components/SortPanel";
import Pagination from "../../../component/Pagination";
import { useSearchParams } from "react-router-dom";

const PostListDesktop = ({ postList, isLoading, getPostList }) => {
    gsap.registerPlugin(ScrollToPlugin);
    const [searchParams,setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || 1
    const isHideSortPanel = useMediaQuery({ query: "(max-width: 1180px)" });
    const isDepartmentPanel = useMediaQuery({ query: "(max-width: 980px)" });

    const documentHeight = () => {
        var body = document.body,
            html = document.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    };

    const scrollThenNextPage = e => {
        gsap.to(window, {
            duration: window.scrollY < 300 ? window.scrollY / documentHeight() : 1,
            scrollTo: 0,
            ease: "expo.inOut",
            onComplete: () => setSearchParams({ page: e }),
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
        <div className="mt-10 flex  w-full items-start justify-center space-x-4 ">
            {!isDepartmentPanel && <DepartmentPanel onChangeDepartment={scrollThenCallback} />}
            <div className="flex-col-cen space-y-4 text-text">
                {isLoading ? (
                    <>
                        <PostFallBack />
                        <PostFallBack />
                        <PostFallBack />
                    </>
                ) : (
                    postList.map((post, i) => <PostDesktop post={post} key={post.subjectID} />)
                )}
                {<Pagination currentPage={page} setPage={scrollThenNextPage} />}
            </div>
            {!isHideSortPanel && <SortPanel />}
        </div>
    );
};

export default PostListDesktop;
