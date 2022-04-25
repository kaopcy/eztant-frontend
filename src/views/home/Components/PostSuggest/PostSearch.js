import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useResponsive } from "../../../../composables/context/useResponsive";
import { useSelector } from "react-redux";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

gsap.registerPlugin(ScrollTrigger);
const PostSearch = () => {
    const isMobile = useResponsive();
    return (
        <>
            {isMobile && <Mobile />}
            {!isMobile && <Desktop />}
        </>
    );
};

const Mobile = () => {
    const { user } = useSelector(state => state.user);
    return (
        <div className="mt-32 flex w-full items-center justify-between px-6 xs:px-14 sm:px-16 ">
            <div className=" relative py-2 pr-4 text-xl font-bold text-text sm:text-3xl ">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-primary-dark " />
                    <span>{user ? "แนะนำ" : "โพสต์"}</span>
                </div>
                <div className="absolute bottom-0 left-0 h-[4px] w-full bg-primary"></div>
            </div>
            <FontAwesomeIcon icon={faSearch} className="text-2xl text-text-light  sm:text-3xl" />
        </div>
    );
};

const Desktop = () => {
    const { user } = useSelector(state => state.user);

    const triggerRef = useRef(null);
    const container = useRef(null);
    const postText = useRef(null);
    const line = useRef(null);
    const detail = useRef(null);
    const inputRef = useRef(null);

    const animation = useRef(null);

    useLayoutEffect(() => {
        animation.current = gsap
            .timeline({ scrollTrigger: { trigger: triggerRef.current, markers: true, start: "top 80%" } })
            .fromTo(postText.current, { yPercent: 200 }, { yPercent: 0, ease: "elastic.out(1.2,1)", duration: 1 })
            .fromTo(detail.current, { yPercent: 250 }, { yPercent: 0, ease: "elastic.out(1.3,1)", duration: 1.6 } , '<')
            .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, ease: "elastic.out(1.2,1)", duration: 1 } , '<');
    }, []);

    return (
        <>
            <div ref={triggerRef} className="m-auto  w-[90%] max-w-[1200px] ">
                <div ref={container} className="flex-col-cen h-[calc(100%-150px)] w-full overflow-hidden bg-text px-20  text-white">
                    <div className="flex-col-cen mt-16 mb-8 w-full space-y-7">
                        <div ref={postText} className="text-4xl font-semibold">
                            โพสต์
                        </div>
                        <div ref={line} className="h-[1px] w-3/4 max-w-md bg-white  "></div>
                        <div ref={detail} className="text-lg lg:text-xl">
                            รวบรวมโพสต์งาน TA ทุกภาควิชาในคณะวิศวกรรมศาสตร์มาไว้ที่นี่แล้ว
                        </div>
                    </div>
                    <SearchBarDesktop ref={inputRef} />
                </div>
            </div>
            {user && (
                <div className="flex-cen mt-10 w-full">
                    <div className="w-[90%] max-w-[1200px] space-x-4 py-8">
                        <FontAwesomeIcon icon={faThumbsUp} className="text-2xl text-primary-dark" />
                        <span className="text-4xl font-bold text-text ">แนะนำ</span>
                    </div>
                </div>
            )}
        </>
    );
};

const SearchBarDesktop = forwardRef((_, ref) => {
    const [searchInput, setSearchInput] = useState("");
    const handleInput = e => {
        const { value } = e.target;
        setSearchInput(value);
    };

    return (
        <div ref={ref} className="mt-6 mb-10 flex w-full space-x-2 text-lg">
            <input type="text" className="w-full px-2 py-1 text-text" onChange={handleInput} />
            <div className="btn-orange h-full whitespace-nowrap py-2 px-5">ค้นหาโพสต์</div>
        </div>
    );
});

export default PostSearch;
