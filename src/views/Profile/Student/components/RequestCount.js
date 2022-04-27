import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import usePostListFetch from "../../../../api/Post/usePostListFetch";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { useRequestPost } from "../../../../composables/interact/useRequestPost";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const RequestCount = () => {
    const { user } = useSelector(state => state.user);

    const postList = useMemo(() => {
        return user?.requested;
    }, [user.requested]);

    const container = useRef(null);

    useLayoutEffect(() => {
        gsap.fromTo(
            ".stagger-post-animation",
            { x: gsap.getProperty(container.current, "width") },
            { x: 0, stagger: { amount: 0.3, each: 0.3 }, ease: "elastic.out(1,1)" }
        );
    }, [postList]);

    const navigate = useNavigate();

    return (
        <div className="relative mt-12 flex w-full max-w-[600px]  flex-col items-center pb-20 text-lg text-text">
            {postList ? (
                postList.length ? (
                    <div ref={container} className="absolute w-full overflow-hidden px-3">
                        {postList.map(post => (
                            <div key={uuid()} className="stagger-post-animation">
                                <Request post={post} />
                            </div>
                        ))}
                        <div className=" stagger-post-animation flex flex-col items-center mt-10">
                            <div
                                className=" btn-white flex items-center space-x-3 rounded-md border-2 px-4 py-2"
                                onClick={() => navigate("/post-list/all-department")}>
                                <div className="">สำรวจเพิ่มเติม</div>
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <div ref={container} className="absolute flex w-full flex-col items-center overflow-hidden px-3">
                        <div className=" stagger-post-animation flex flex-col items-center">
                            <div className=" mb-4">คุณยังไม่เคยสมัครเป็น TA</div>
                            <div
                                className=" btn-white flex items-center space-x-3 rounded-md border-2 px-4 py-2"
                                onClick={() => navigate("/post-list/all-department")}>
                                <div className="">สำรวจ</div>
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </div>
                        </div>
                    </div>
                )
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

const Request = ({ post }) => {
    const { mutate, isLoading, error, isSuccess } = useRequestPost();

    const { user } = useSelector(state => state.user);
    const sectionID = useMemo(() => {
        let temp;
        post?.schedules.forEach(schedule => {
            schedule.requested.forEach(requestedUser => {
                if (requestedUser._id === user._id) temp = schedule._id;
            });
        });

        return temp;
    }, [post, user]);
    console.log(`sectionID: ${sectionID}`);

    const onCancle = () => {
        if (!sectionID) return;
        mutate(sectionID);
    };
    useEffect(() => {
        console.log(error?.response?.data?.message);
    }, [isSuccess, error]);

    return (
        <div className="mb-5 flex w-full items-center justify-between rounded-md bg-gray-200 px-5 py-3 font-semibold">
            <div className="flex items-center">
                <div className="mr-2">{post.subject_name}</div>
                <div className="">{post.subject_id}</div>
            </div>
            <div className="text-secondary underline " onClick={() => onCancle()}>
                {isLoading && <div className="">กำลังโหลด</div>}
                {error && <div className="">{error?.response?.data?.message}</div>}
                {isSuccess && <div className="">สำเร็จ!</div>}
                <div className="">ยกเลิกคำขอ</div>
            </div>
        </div>
    );
};

export default RequestCount;
