import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFileImport } from "@fortawesome/free-solid-svg-icons";

import { CommunityContext } from "./CommunityHomeContext";

const CommunityHome = () => {
    const { community } = useContext(CommunityContext);
    return (
        <div className="mt-3 flex w-full max-w-[900px] flex-col items-center  pb-20 text-text">
            <Header />
            {community.posts && community.posts.map((eachPost, index) => <Post index={index} key={eachPost.id} post={eachPost} />)}
        </div>
    );
};

const Header = () => {
    const { community, addPost } = useContext(CommunityContext);
    const { user } = useSelector(state => state.user);

    const [input, setInput] = useState("");
    const inputFileRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        const file = inputFileRef.current.files[0];
        formData.append("wadwada", file);

        console.log(file);
        addPost(input);
    };

    return (
        <form onSubmit={handleSubmit} className="h-[450px] w-full overflow-hidden  rounded-md shadow-xl">
            <div className="flex h-[45%] w-full flex-col items-center justify-around bg-secondary">
                <div className="font rounded-full bg-white px-6 py-1 text-sm text-text-light">{community.department}</div>
                <div className="text-4xl font-bold text-white ">{community.subjectName}</div>
                <div className="mb-4 text-3xl font-bold text-white ">{community.subjectID}</div>
            </div>
            <div className="flex h-full w-full items-start bg-white px-14 py-4">
                <img src={user.imgURL} alt="" className="mr-3 h-14 w-14 rounded-full " />
                <div className="mt-3 flex w-full flex-col items-start">
                    <div className="text-xl font-bold ">
                        {user.firstname} {user.lastname}
                    </div>
                    <textarea onChange={e => setInput(e.target.value)} className="cool-input mt-4 h-24 w-full rounded-md border p-2" />
                    <div className="mt-6 flex w-full items-center justify-between">
                        <div className="relative flex cursor-pointer items-center rounded-full bg-gray-200 px-4 py-1">
                            <FontAwesomeIcon icon={faFileImport} className="mr-2 text-text" />
                            <input ref={inputFileRef} type="file" className="absolute h-0 w-0 opacity-0" id="file" />
                            <label htmlFor="file" className="cursor-pointer text-sm font-semibold">
                                อัปโหลดไฟล์
                            </label>
                        </div>
                        <button type="submit" className="btn-orange rounded-md px-8 py-1 text-xl">
                            โพสต์
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const Post = ({ post, index }) => {
    // animation
    const detailRef = useRef(null);
    const MAX_HEIGHT = "100px";
    const animateDetail = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);

    const handleClick = () => {
        animateDetail.current.reversed() ? animateDetail.current.play() : animateDetail.current.reverse();
    };
    useLayoutEffect(() => {
        gsap.set(detailRef.current, { height: MAX_HEIGHT });
    }, []);
    useEffect(() => {
        setIsOverflow(detailRef.current?.scrollHeight > detailRef.current?.clientHeight);
        if (!isOverflow) {
            gsap.set(detailRef.current, { height: "auto" });
        } else {
            gsap.set(detailRef.current, { height: MAX_HEIGHT });
        }
        animateDetail.current = gsap.to(detailRef.current, {
            height: "auto",
            paused: true,
            reversed: true,
            duration: 0.3,
            onComplete: () => {
                setIsShowMore(true);
            },
            onReverseComplete: () => {
                setIsShowMore(false);
            },
        });
    }, [isOverflow]);

    return (
        <div className="mt-10 w-full overflow-hidden rounded-lg border pt-4 shadow-xl">
            <div className="flex h-full w-full items-center justify-between bg-white px-14 py-4">
                <div className="flex items-start ">
                    <img src={post.user?.imgURL} alt="" className="mr-3 h-14 w-14 rounded-full " />
                    <div className="mt-3 flex w-full flex-col items-start">
                        <div className="text-xl font-bold ">
                            {post.user.firstname} {post.user.lastname}
                        </div>
                    </div>
                </div>
                <Moment className="whitespace-nowrap text-sm text-text-light" locale="th" fromNow>
                    {post.created_at}
                </Moment>
            </div>
            <div className="relative mt-8 flex w-full items-start justify-between overflow-hidden  px-14 " ref={detailRef}>
                <div className="w-full text-xl font-semibold">
                    <div className="whitespace-pre-wrap">
                        {post.body} {JSON.stringify(isOverflow)}
                    </div>
                    {isOverflow && <div className="h-[70px]"></div>}
                </div>
                {isOverflow && (
                    <div className="opacity-gradient absolute bottom-0  z-10 h-[100px] w-full cursor-pointer " onClick={() => handleClick()}>
                        <div className="absolute bottom-0 left-0 self-end text-sm text-text underline">{isShowMore ? "ดูน้อยลง" : "ดูเพิ่มเติม"}</div>
                    </div>
                )}
            </div>
            <Comment comments={post.comments} index={index} />
        </div>
    );
};

const Comment = ({ comments, index }) => {
    const container = useRef(null);
    const animate = useRef(null);
    const commentRef = useRef(null);
    const { user } = useSelector(state => state.user);
    const [isExpand, setIsExpand] = useState(false);
    const [input, setInput] = useState("");

    const { addComment } = useContext(CommunityContext);

    useEffect(() => {
        setTimeout(() => {
            console.log("yayaya");
            const height = commentRef.current.clientHeight + 48;
            console.log(height);
            animate.current = gsap.to(container.current, { height: height, paused: true, reversed: true });
            if (isExpand) {
                animate.current.play();
            } else {
                gsap.to(container.current, { height: "48px" });
            }
        }, 1);
    }, [comments, isExpand]);

    const toggle = () => {
        setIsExpand(e => !e);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (input.length <= 0) return;
        addComment(input, index);
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} ref={container} className="relative mt-10 h-12 w-full bg-secondary">
            <div className="flex h-12 cursor-pointer items-center px-14 text-white " onClick={() => toggle()}>
                <div className="mr-2 text-base font-semibold">คอมเมนท์ ({comments?.length})</div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isExpand && "rotate-180 "}`} />
            </div>
            <div className="w-full bg-secondary px-14 pb-4" ref={commentRef}>
                <div className="flex w-full items-start">
                    <div className="mr-5 h-14 w-14 shrink-0 overflow-hidden rounded-full">
                        <img src={user.imgURL} alt="" className="h-full w-full" />
                    </div>
                    <input value={input} onChange={e => setInput(e.target.value)} className="cool-input h-16 w-full rounded-md border p-2" />
                </div>
                {comments.map(comment => (
                    <div key={comment.id} className="mt-6 flex w-full ">
                        <div className="mr-5 h-14 w-14 shrink-0 overflow-hidden rounded-full">
                            <img src={user.imgURL} alt="" className="h-full w-full" />
                        </div>
                        <div className="rounded-md bg-white px-4 py-2">
                            <div className="font-semibold text-orange-500 ">
                                {comment.user.firstname} {comment.user.lastname}
                            </div>
                            <div className="">{comment.body}</div>
                        </div>
                        <Moment className="mx-4 self-end whitespace-nowrap text-sm text-white" locale="th" fromNow>
                            {comment.created_at}
                        </Moment>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default CommunityHome;
