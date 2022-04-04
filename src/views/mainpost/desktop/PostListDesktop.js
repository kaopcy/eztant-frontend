import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useMediaQuery } from "react-responsive";

import PostDesktop from "./components/PostDesktop";
import DepartmentPanel from "./components/DepartmentPanel";
import SortPanel from "./components/SortPanel";
import { useNonInitialEffect } from "../../../composables/useNonInitialEffect";

const PostListDesktop = ({ postList, isLoading, getPostList }) => {
    gsap.registerPlugin(ScrollToPlugin)

    const isHideSortPanel = useMediaQuery({ query: "(max-width: 1180px)" });
    const isDepartmentPanel = useMediaQuery({ query: "(max-width: 980px)" });
    const PostList = useRef([]);

    // const clear = async () => {
    //     await ScrollTrigger.getAll("trigger1").forEach(e => e.kill(true));
    //     await gsap.set(PostList.current, { clear: true });
    // };

    const scrollToTop = ()=>{
        gsap.to(window , { duration: 1, scrollTo: 0 , ease: 'expo.inOut', onComplete: ()=> getPostList()  } )
    }

    // useNonInitialEffect(() => {
    //     console.log("...clear");
    //     const haha = async () => {
    //         await clear();
    //         await add();
    //     };
    //     haha();
    // }, [postList]);

    // const add = () => {
    //     console.log("...");
    //     PostList.current.forEach((post, i) => {
    //         gsap.to(post, {
    //             y: -200,
    //             scale: 0.9,
    //             scrollTrigger: {
    //                 id: "trigger1",
    //                 trigger: post,
    //                 start: "top 80px",
    //                 end: "bottom top",
    //                 scrub: true,
    //                 pin: true,
    //                 pinSpacing: false,
    //             },
    //         });
    //     });
    // };

    return (
        <div className="flex mt-10  w-full items-start justify-center space-x-4 ">
            {!isDepartmentPanel && <DepartmentPanel />}
            <div className="flex-col-cen space-y-4 text-text">
                {postList.map((post, i) => (
                    <PostDesktop ref={e => (PostList.current[i] = e)} post={post} key={post.subjectID} />
                ))}
                {
                    <div className="btn-white px-4 py-2" onClick={() => getPostList()}>
                        CLikc to decrease
                    </div>
                }
                {
                    <div className="btn-orange px-4 py-2" onClick={() => scrollToTop()}>
                        Click to scroll to top
                    </div>
                }
            </div>
            {!isHideSortPanel && <SortPanel />}
        </div>
    );
};

export default PostListDesktop;
