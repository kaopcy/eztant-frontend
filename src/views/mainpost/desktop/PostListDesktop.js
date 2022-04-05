import React, { useContext, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useMediaQuery } from "react-responsive";
import { PageContext } from "../context/PageContext";

import PostDesktop, { PostFallBack } from "./components/PostDesktop";
import DepartmentPanel from "./components/DepartmentPanel";
import SortPanel from "./components/SortPanel";
import Pagination from "../../../component/Pagination";

const PostListDesktop = ({ postList, isLoading, getPostList }) => {
    gsap.registerPlugin(ScrollToPlugin);

    const isHideSortPanel = useMediaQuery({ query: "(max-width: 1180px)" });
    const isDepartmentPanel = useMediaQuery({ query: "(max-width: 980px)" });

    const scrollToTop = () => {
        gsap.to(window, { duration: 1, scrollTo: 0, ease: "expo.inOut", onComplete: () => getPostList() });
    };

    const scrollThenNextPage = e => {
        gsap.to(window, { duration: 1, scrollTo: 0, ease: "expo.inOut", onComplete: () => setPage(e) });
        return page;
    };

    const scrollThenCallback = (cb = () => {}) => {
        var body = document.body,
            html = document.documentElement;

        var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        console.log(window.scrollY / height);
        gsap.to(window, { duration: window.scrollY < 300 ? (window.scrollY / height) : 1, scrollTo: 0, ease: "expo.inOut", onComplete: () => cb() });
    };

    const { setPage, page } = useContext(PageContext);
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
                {
                    <div className="btn-white px-4 py-2" onClick={() => scrollThenCallback()}>
                        CLikc to decrease
                    </div>
                }
                {
                    <div className="btn-orange px-4 py-2" onClick={() => scrollToTop()}>
                        Click to scroll to top
                    </div>
                }
                {<Pagination currentPage={page} setPage={scrollThenNextPage} />}
            </div>
            {!isHideSortPanel && <SortPanel />}
        </div>
    );
};

export default PostListDesktop;
