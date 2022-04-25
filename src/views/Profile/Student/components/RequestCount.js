import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import usePostListFetch from "../../../../api/Post/usePostListFetch";
import { v4 as uuid } from "uuid";

const RequestCount = () => {
    const { isLoading, postList } = usePostListFetch("allDepartment", 1);

    const isDataReady = useMemo(() => {
        if (!postList || isLoading || postList.length === 0) return false;
        return true;
    }, [postList, isLoading]);

    const container = useRef(null);

    useLayoutEffect(() => {
        gsap.fromTo(
            ".stagger-post-animation",
            { x: gsap.getProperty(container.current, "width") },
            { x: 0, stagger: { amount: 0.3, each: 0.3 }, ease: "elastic.out(1,1)" }
        );
    }, [isDataReady, postList]);

    return (
        <div className="flex w-full max-w-[600px] items-center relative  flex-col pb-20 text-lg text-text mt-12">
            {isDataReady ? (
                <div ref={container} className="absolute overflow-hidden px-3 w-full">
                    {postList.map(post => (
                        <div key={uuid()} className="stagger-post-animation">
                            <Request post={post} />
                        </div>
                    ))}
                </div>
            ) : (
                <div ref={container} className="absolute overflow-hidden px-3">
                    <div key={uuid()} className="stagger-post-animation">
                        กำลังโหลด . . .
                    </div>
                </div>
            )}
        </div>
    );
};

const Request = () => {
    return (
        <div className="flex items-center justify-between rounded-md bg-gray-200 px-5 py-3 mb-5 w-full font-semibold">
            <div className="flex items-center">
                <div className="mr-2">DATA COMMUNICATION</div>
                <div className="">0100123</div>
            </div>
            <div className="text-secondary underline ">ยกเลิกคำขอ</div>
        </div>
    );
};

export default RequestCount;
