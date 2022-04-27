import React, { useContext, useEffect, useRef, useState, useLayoutEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import Moment from "react-moment";
import "moment/locale/th";

import { CommunityContext, CommunityActionContext } from "../CommunityContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleChevronRight, faXmarkCircle, faUpload } from "@fortawesome/free-solid-svg-icons";

import { fileValidate } from "../../../utils/fileUploadValidate";
import { fileIcon } from "../../../utils/fileIcon";
import { useForm } from "react-hook-form";
import { useFetchCommunityByID } from "../../../composables/fetch/useFetchCommunity";
import { useAddCommunityComment, useAddCommunityPost } from "../../../composables/interact/useAddCommunityPost";

const CommunityHome = () => {
    const community = useContext(CommunityContext);

    const { data, error, isLoading } = useFetchCommunityByID();

    return (
        <div className="mt-3 flex w-full max-w-[900px] flex-col items-center  pb-20 text-text">
            {!isLoading && <Header community={data?.data?.recruit_post_id} />}
            {!isLoading && data?.data?.community_posts.map((eachPost, index) => <Post index={index} key={eachPost._id} post={eachPost} />)}
        </div>
    );
};

const Header = ({ community }) => {
    // const { addPost } = useContext(CommunityActionContext);
    const { user } = useSelector(state => state.user);
    const {
        register,
        handleSubmit,
        resetField,
        reset,
        formState: { errors },
        watch,
    } = useForm({ mode: "onChange" });

    const {
        mutate: addPost,
        error,
        isLoading,
    } = useAddCommunityPost(() => {
        reset();
    });

    const fileWatch = watch("file");
    const [fileInputName, setFileInputName] = useState(null);
    // useEffect(() => {
    //     console.log(fileWatch?.[0]?.name);
    //     setFileInputName(fileWatch?.[0]?.name);
    // }, [fileWatch]);

    const { data: commudata } = useFetchCommunityByID();
    const onSubmit = data => {
        console.log(data.body);
        addPost({ commuID: commudata?.data?._id, body: data.body });
        // addPost(data.body, data.file[0]);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-[450px] w-full overflow-hidden  rounded-md  bg-white shadow-md">
            <div className="flex h-[45%] w-full flex-col items-center justify-around bg-secondary">
                <div className="font mt-2 rounded-full bg-white px-6 py-1 text-sm text-gray-400  shadow-md ">{community.department}</div>
                <div className="text-4xl font-bold uppercase text-white">{community.subject_name}</div>
                <div className="mb-4 text-3xl font-bold text-white ">{community.subject_id}</div>
            </div>
            <div className="flex h-full w-full items-start bg-white px-4 py-4 md:px-8 lg:px-14">
                <img src={user.imgURL} alt="" className="mr-3 h-14 w-14 rounded-full " />
                <div className="mt-3 flex w-full flex-col items-start">
                    <div className="text-xl font-bold ">
                        {user.firstname} {user.lastname}
                    </div>
                    <div className="relative  mt-4  h-24 w-full ">
                        <div className="absolute bottom-full right-0 text-sm text-red-400">{errors?.body?.message}</div>
                        <textarea
                            placeholder="ประกาศ..."
                            {...register("body", { required: { message: "กรุณากรอกข้อความ", value: true } })}
                            className={`cool-input h-full w-full rounded-md border-2 p-2 ${errors?.body && "border-2  border-red-300"}`}
                        />
                    </div>
                    {/* <div className="">{ JSON.stringify(errors) || 'dd' }</div> */}
                    <div className="mt-6 flex w-full items-center justify-between">
                        <div className="flex items-center">
                            <div className="relative flex cursor-pointer items-center rounded-full bg-gray-200 px-4 py-2">
                                <FontAwesomeIcon icon={faUpload} className="mr-2 text-text" />
                                <input {...register("file", fileValidate)} type="file" className="absolute h-0 w-0 opacity-0" id="file" />
                                <label htmlFor="file" className="cursor-pointer text-sm font-semibold">
                                    อัปโหลดไฟล์
                                </label>
                            </div>
                            {errors?.file && <div className="">{errors?.file?.message}</div>}
                            {fileInputName && (
                                <div className="ml-4 flex min-w-0  items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-normal text-text">
                                    <FontAwesomeIcon icon={fileIcon(fileInputName)} />
                                    <div className="ellipsis ml-2 max-w-[50px] ">{fileInputName}</div>
                                    <FontAwesomeIcon
                                        icon={faXmarkCircle}
                                        className="ml-2 text-xs"
                                        onClick={() => {
                                            setFileInputName(null);
                                            resetField("file");
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            {isLoading && <div className="mr-4 text-sm text-gray-400">กำลังส่ง...</div>}
                            {error && <div className="mr-4 text-sm text-red-500">{error?.response?.data.message}</div>}
                            <button type="submit" className="btn-orange rounded-md px-8 py-1 text-xl">
                                โพสต์
                            </button>
                        </div>
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
    // const { toggleIsPlay } = useContext(CommunityActionContext);

    const container = useRef(null);
    const isPlay = (new Date().getTime() - new Date(post.createdAt).getTime()) / 1000 < 5;
    useEffect(() => {
        if (isPlay) {
            gsap.timeline({})
                .fromTo(container.current, { yPercent: -120 }, { yPercent: 0, duration: 0.7, ease: "elastic.out(1,0.7)" })
                .fromTo(
                    container.current,
                    { outlineStyle: "solid", outlineOffset: 0, outlineWidth: 5, outlineColor: "#74c0fc" },
                    { outlineOffset: 0, outlineWidth: 0, outlineColor: "transparent", duration: 3, ease: "power4.inOut" }
                );
        }
    }, [post, isPlay]);

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
        <div className="mt-10 w-full  p-1 ">
            <div ref={container} className="w-full overflow-hidden  rounded-lg border  bg-white pt-4 shadow-md">
                <div className="flex h-full w-full items-center justify-between px-4 py-4 md:px-8 lg:px-14">
                    <div className="flex items-start ">
                        <img src={post.owner_id?.imgURL || null} alt="" className="mr-3 h-14 w-14 shrink-0  rounded-full " />
                        <div className="mt-3 flex w-full flex-col items-start justify-center">
                            <div className="text-xl font-bold ">
                                {post.owner_id?.firstname} {post.owner_id?.lastname}
                            </div>
                            <div className="-mt-2 text-sm text-text-light">{post.owner_id.role === "teacher" ? "อาจารย์" : "นักศึกษา"}</div>
                        </div>
                    </div>
                    <Moment className="whitespace-nowrap text-sm text-text-light" locale="th" fromNow date={post.createdAt} />
                </div>
                <div className="relative mt-4 flex w-full items-start justify-between overflow-hidden  px-4 md:px-8 lg:px-14 " ref={detailRef}>
                    <div className="flex w-full flex-col">
                        <div className="whitespace-pre-wrap  text-lg">{post.description}</div>
                        {post.file?.name && (
                            <div className=" flex min-w-0  items-center self-start rounded-full bg-gray-200 px-3 py-1 text-sm font-normal text-text">
                                <FontAwesomeIcon icon={fileIcon(post.file.name)} />
                                <div className="ellipsis ml-2 max-w-[300px] ">{post.file.name}</div>
                                <FontAwesomeIcon icon={faXmarkCircle} className="ml-2 text-xs" />
                            </div>
                        )}
                        {isOverflow && <div className="h-[70px]"></div>}
                    </div>
                    {isOverflow && (
                        <div className="opacity-gradient absolute bottom-0  z-10 h-[100px] w-full cursor-pointer " onClick={() => handleClick()}>
                            <div className="absolute bottom-0 left-0 self-end text-sm text-text underline">
                                {isShowMore ? "ดูน้อยลง" : "ดูเพิ่มเติม"}
                            </div>
                        </div>
                    )}
                </div>
                <Comment postID={post._id} comments={post?.comments} index={index} />
            </div>
        </div>
    );
};

const Comment = ({ postID, comments, index }) => {
    const { mutate: addComment, isLoading, error } = useAddCommunityComment();

    const { data: commudata } = useFetchCommunityByID();

    const container = useRef(null);
    const animate = useRef(null);
    const commentRef = useRef(null);
    const { user } = useSelector(state => state.user);
    const [isExpand, setIsExpand] = useState(false);
    const [input, setInput] = useState("");
    // const { addComment } = useContext(CommunityActionContext);

    useEffect(() => {
        setTimeout(() => {
            const height = commentRef.current.clientHeight + 48;
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
        addComment({ commuID: commudata?.data?._id, body: input, postID });
        // addComment(input, index);
        setInput("");
    };

    const isSameUser = useCallback(comment => user?._id === comment?.owner_id?._id, [user]);

    return (
        !isLoading && (
            <>
                <form onSubmit={handleSubmit} ref={container} className="relative mt-10 h-12 w-full bg-secondary">
                    <div className="flex h-12 cursor-pointer items-center px-4 text-white md:px-8 lg:px-14 " onClick={() => toggle()}>
                        <div className="mr-2 text-base font-semibold">คอมเมนท์ ({comments?.length})</div>
                        <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isExpand && "rotate-180 "}`} />
                    </div>
                    <div className="w-full bg-secondary px-4 pb-4 md:px-8 lg:px-14" ref={commentRef}>
                        {comments.map(comment => (
                            <div
                                key={comment?._id}
                                className={`mt-6 flex w-full first:mt-0   ${isSameUser(comment) ? "flex-row-reverse" : "justify-start"}`}>
                                <div
                                    className={` h-14 w-14 shrink-0 overflow-hidden rounded-full ${
                                        isSameUser(comment) ? "ml-5 mr-0 " : "mr-5 ml-0"
                                    }`}>
                                    <img src={user?.imgURL || ""} alt="" className="h-full w-full" />
                                </div>
                                <div className="rounded-md bg-white px-4 py-2">
                                    <div className="font-semibold text-orange-500 ">
                                        {comment?.owner_id?.firstname} {comment?.owner_id?.lastname}
                                    </div>
                                    <div className="max-w-[300px] break-all">{comment?.comment}</div>
                                </div>
                                <Moment className="mx-4 self-end whitespace-nowrap text-sm text-white" locale="th" fromNow>
                                    {comment.createdAt}
                                </Moment>
                            </div>
                        ))}
                        <div className="mt-6 mb-6 flex w-full items-start">
                            <div className="mr-5  h-14  w-14 shrink-0 overflow-hidden rounded-full">
                                <img src={user?.imgURL || ""} alt="" className="h-full w-full" />
                            </div>
                            <div className=" relative flex h-16 w-full items-center ">
                                <textarea
                                    placeholder="เพิ่มความคิดเห็นของคุณ..."
                                    id="text-area"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    className="cool-input h-16 w-full rounded-md border p-2 pr-10"
                                />
                                <button className="absolute right-5" type="submit">
                                    <FontAwesomeIcon icon={faCircleChevronRight} className="text-lg" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    );
};

export default CommunityHome;
