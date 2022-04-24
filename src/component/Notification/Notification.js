import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { v4 as uuid } from "uuid";
import Moment from "react-moment";
import "moment/locale/th";
import { useNonInitialEffect } from "../../composables/useNonInitialEffect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { viewNotification } from "../../store/actions/authAction";

const Notification = forwardRef(({ isNoti, setIsNoti }, ref) => {
    const { user } = useSelector(state => state.user);
    const tempType = useRef("all");
    const [type, setType] = useState("all");
    const notificationList = useMemo(() => user?.notification.filter(e => e.type === type), [user, type]);

    const container = useRef(null);
    const animation = useRef(null);
    const closeAnimation = useRef(null);
    useImperativeHandle(ref, () => ({
        close: () => {
            closeAnimation.current.play();
        },
        play: () => animation.current.play(),
    }));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(viewNotification);
    }, [dispatch]);

    useEffect(() => {
        animation.current = gsap
            .timeline({
                yoyo: true,
                defaults: {
                    ease: "none",
                },
            })
            .fromTo(
                container.current,
                { height: 0, borderStyle: "none" },
                { height: "500px", borderStyle: "solid", yoyoEase: true, ease: "expo.out" }
            )
            .fromTo(
                ".each-detail-noti",
                {
                    xPercent: 100,
                },
                {
                    xPercent: 0,
                    ease: "elastic.out(1,1)",
                    stagger: {
                        amount: 0.3,
                        each: 0.3,
                    },
                },
                "<"
            );
    }, []);

    useEffect(() => {
        console.log("change aniamtion");
        closeAnimation.current = gsap
            .timeline({ paused: true, onComplete: () => setIsNoti(false) })
            .to(container.current, { height: 0, borderStyle: "none" })
            .to(
                ".each-detail-noti",
                {
                    xPercent: 100,
                    ease: "elastic.in(1,1)",
                    stagger: {
                        amount: 0.3,
                        each: 0.3,
                    },
                    duration: 0.4,
                },
                "<"
            );
    }, [type]);

    useEffect(() => {
        const onClick = e => {
            if (isNoti && !container.current.contains(e.target)) {
                closeAnimation.current.play();
            }
        };
        window.addEventListener("click", onClick);

        return () => window.removeEventListener("click", onClick);
    }, [isNoti, ref]);

    useNonInitialEffect(() => {
        const direction = () => {
            if (tempType.current === "post" && type === "all") return -1;
            else if (tempType.current === "post" && type === "community") return 1;
            else if (tempType.current === "community" && type === "post") return -1;
            else if (type === "all") return -1;
            return 1;
        };
        gsap.fromTo(
            ".each-detail-noti",
            {
                xPercent: 100 * direction(),
            },
            {
                xPercent: 0,
                ease: "elastic.out(1,1)",
                stagger: {
                    amount: 0.3,
                    each: 0.3,
                },
                overwrite: true,
            },
            "<"
        );
        tempType.current = type;
    }, [type]);

    return (
        <div
            ref={container}
            className="absolute top-[140%] -right-10 w-[450px]  overflow-hidden  whitespace-nowrap rounded-lg border-2  bg-white font-normal  text-text shadow-md">
            <Triangle />
            <div className="py-4  px-4 text-2xl">การแจ้งเตือน</div>
            <Nav type={type} setType={setType} />
            <Divider />
            <FontAwesomeIcon icon={faXmark} className="absolute right-4 top-4 p-4 text-red-500" onClick={() => closeAnimation.current.play()} />
            {user ? (
                notificationList.length > 0 ? (
                    notificationList.map(data => <EachDetail key={data.id} data={data} />)
                ) : (
                    <div className="each-detail-noti"></div>
                )
            ) : (
                <>
                    <div className="each-detail-noti">

                    </div>
                    <div className="w-full mt-20 text-center ">กรุณาล็อคอินก่อน</div>
                </>
            )}
        </div>
    );
});

const Nav = ({ type, setType }) => {
    const indicatorRef = useRef(null);
    const allRef = useRef(null);
    const postRef = useRef(null);
    const communityRef = useRef(null);

    const properties = useMemo(() => {
        if (type === "all") {
            return { left: 24 };
        } else if (type === "post") {
            return { left: allRef.current.clientWidth + 40 + 24, width: postRef.current.clientWidth };
        } else if (type === "community") {
            return { left: allRef.current.clientWidth + postRef.current.clientWidth + 80 + 24, width: communityRef.current.clientWidth };
        }
    }, [type]);

    useEffect(() => {
        gsap.to(indicatorRef.current, { width: allRef.current.clientWidth, ...properties, ease: "elastic.out(1.3,0.8)" });
    }, [properties]);

    return (
        <div className="relative flex items-center self-start px-6 py-3">
            <div onClick={() => setType("all")} ref={allRef} className="mr-[40px] cursor-pointer">
                ทั้งหมด
            </div>
            <div onClick={() => setType("post")} ref={postRef} className="mr-[40px] cursor-pointer">
                โพสต์
            </div>
            <div onClick={() => setType("community")} ref={communityRef} className=" cursor-pointer">
                คอมมูนิตี้
            </div>
            <div ref={indicatorRef} className="absolute bottom-0 h-[2px] w-[20px] bg-primary-dark  "></div>
        </div>
    );
};

const EachDetail = forwardRef(({ data }, ref) => {
    return (
        <>
            <div ref={ref} className="each-detail-noti flex w-full items-center px-4 py-3">
                <div className="mr-6 aspect-square w-10 shrink-0 overflow-hidden rounded-full">
                    <img src={data.imgURL} alt="" className="mr-4 h-full w-full bg-slate-100 object-cover" />
                </div>
                <div className="flex w-full flex-col items-start">
                    <div className="flex w-full items-center space-x-2 ">
                        <div className="whitespace-nowrap  text-base ">{data.firstname}</div>
                        <div className="whitespace-nowrap  ">{data.lastname}</div>
                        <div className="whitespace-nowrap  text-blue-600">{data.body}</div>
                    </div>
                    <Moment className="whitespace-nowrap text-sm text-text-light" locale="th" fromNow date={data.created_at} />
                    <div className="-mt-[2px]  text-xs text-text-light ">{}</div>
                </div>
            </div>
            <Divider />
        </>
    );
});

const Divider = () => <div className="h-[1px] w-full bg-gray-200"></div>;

const Triangle = () => <div className="triangle-clip absolute -top-[10px]  right-10 h-5 w-5 rotate-[135deg] border-2 bg-white"></div>;
export default Notification;
