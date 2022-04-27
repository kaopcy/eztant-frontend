import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Moment from "react-moment";
import "moment/locale/th";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import TeachTable from "./TeachTable";
import Like from "../../components/Like";
import { useDispatch, useSelector } from "react-redux";
import { useRequestPost } from "../../../../composables/interact/useRequestPost";
import { getUser } from "../../../../store/actions/authAction";
import ApplyPopup from "./ApplyPopup";
import { useDeletePostByID } from "../../../../composables/interact/useDeletePost";

const PostDesktop = ({ post }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { mutate: request, data, isLoading, error, isSuccess } = useRequestPost(() => {
        dispatch(getUser());
        setIsRequest(false);
        flash('#EF4444')
    });
    
    const [isSelect, setIsSelect] = useState(false);
    const [requestedSection , setRequestedSection] = useState(false)

    useEffect(()=>{
        post?.tables?.forEach(table => {
            table.requested.forEach(requestedUser => {
                if (requestedUser._id === user._id) {
                    setRequestedSection(table._id);
                }
            });
        });

    })

    const onCancle = () => {
        if (!requestedSection) return;
        request(requestedSection);
    };

    const [isRequest, setIsRequest] = useState(user?.requested?.map(e => e._id).includes(post?._id));

    const container = useRef(null);
    const animate = useRef(null);
    const flash = color => {
        gsap.fromTo(
            container.current,
            { outlineStyle: "solid", outlineWidth: 5, outlineColor: color || "#74c0fc" },
            { outlineWidth: 0, overwrite: true, ease: "power4.out", duration: 1.5, delay: 0.3 }
        );
    };

    return (
        <div ref={container} className="mypost w-[768px] shrink-0 rounded-md  border bg-white px-10 py-8 text-xl shadow-md ">
            {isSelect && <ApplyPopup selectedPost={post} setSelectedPost={setIsSelect} setIsRequest={setIsRequest} setRequestedSection={setRequestedSection} flash={flash} />}
            <Header post={post} />
            <Detail post={post} />
            <div className="relative flex justify-end space-x-8">
                <>
                    {isRequest ? (
                        <>
                            {error && <div className="text-xs self-center text-red-500">{error.response.data.message}</div>}
                            {isLoading && <div className="text-xs self-center">กำลังโหลด</div>}
                            {isSuccess && <div className="text-xs self-center text-green-500">ยกเลิกสำเร็จ</div>}
                            <button
                                type="button"
                                disabled={user?.role === "teacher"}
                                className="btn-white group relative rounded-lg px-10 py-2"
                                onClick={() => onCancle()}>
                                ยกเลิกการสมัคร
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            disabled={user?.role === "teacher"}
                            className="btn-orange group relative rounded-lg px-10 py-2"
                            onClick={() => setIsSelect(true)}>
                            {user?.role === "teacher" && (
                                <div className="invisible absolute left-1/2  bottom-[120%] z-20  h-full  -translate-x-1/2 whitespace-nowrap  rounded-md  border  bg-white px-4 py-3 text-sm text-text transition-all group-hover:visible">
                                    สำหรับนักเรียนเท่านั้น
                                </div>
                            )}
                            สมัครเป็น TA
                        </button>
                    )}
                    <Like flashAnimate={flash} likes={post.likes} postID={post._id} />
                </>
            </div>
        </div>
    );
};

const Header = ({ post }) => {
    const { user } = useSelector(state => state.user);
    const [isEllipsis, setIsEllipsis] = useState(false);

    const left = () => (
        <div className="flex-cen w-full justify-start space-x-4">
            <div className="h-16 w-16 overflow-hidden rounded-full">
                <img src={post?.authorAvatar} alt="" className="h-full w-full bg-slate-100" />
            </div>
            <div className="flex flex-col ">
                <span className="font-semibold">{post?.author}</span>
                <span className="text-sm text-text-light">{post?.department}</span>
            </div>
        </div>
    );

    const right = post => (
        <div className="flex-cen space-x-3">
            <Moment className="whitespace-nowrap text-sm text-text-light" locale="th" fromNow>
                {post.createdAt}
            </Moment>
            {post.owner_id._id === user._id && (
                <div className="relative">
                    <FontAwesomeIcon icon={faEllipsis} className="text-lg " onClick={() => setIsEllipsis(e => !e)} />
                    {isEllipsis && <DeleteButton postID={post?._id} setIsEllipsis={setIsEllipsis} />}
                </div>
            )}
        </div>
    );

    return (
        <div className="flex-cen w-full">
            {left(post)}
            {right(post)}
        </div>
    );
};

const DeleteButton = ({ setIsEllipsis , postID }) => {
    const deleteRef = useRef(null);
    const { mutate ,error } = useDeletePostByID(()=>{ console.log('deleted successfully'); })

    useEffect(() => {
        const onClick = e => {
            if (!deleteRef.current.contains(e.target)) {
                setIsEllipsis(false);
            }
        };
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, [setIsEllipsis]);

    const onClickDelete = ()=>{
        console.log(postID);
        mutate(postID)
    }

    return (
        <div ref={deleteRef} className="absolute bottom-full right-0  flex items-center whitespace-nowrap rounded-md border-2 bg-white px-4 py-2 ">
            <div className="mr-3 text-base" onClick={()=> onClickDelete()} >ลบโพสต์</div>
            <FontAwesomeIcon className="text-sm text-red-500" icon={faTrashAlt} />
        </div>
    );
};

const Detail = ({ post }) => {
    const detailRef = useRef(null);
    const animateDetail = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const [isShowMore, setIsShowMore] = useState(false);

    const handleClick = () => {
        animateDetail.current.reversed() ? animateDetail.current.play() : animateDetail.current.reverse();
    };

    useEffect(() => {
        setIsOverflow(detailRef.current?.scrollHeight > detailRef.current?.clientHeight);
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
    }, []);

    const text = ({ label, detail, className = "" }) => (
        <div className={`${className} flex min-w-0 items-start whitespace-nowrap `}>
            <span className="w-28 font-semibold">{label}</span>
            <span className="max-w-[220px]  whitespace-pre-line">{detail}</span>
        </div>
    );
    return (
        <div className="relative mt-8 flex h-[400px] items-start justify-between overflow-hidden " ref={detailRef}>
            <div className="mb-10 flex max-w-[50%] flex-col  space-y-4 text-lg">
                {text({ label: "ชื่อวิชา", detail: post.subjectName })}
                {text({ label: "รหัสวิชา", detail: post.subjectID })}
                {text({ label: "ค่าตอบแทน", detail: `${post.wage} บาท/ชั่วโมง` })}
                {text({ label: "ชั้นปีที่รับ", detail: post.year.join() })}
                <div className={`flex min-w-0 items-center whitespace-nowrap `}>
                    <span className="mr-6 font-semibold">เกรดรายวิชาไม่ต่ำกว่า</span>
                    <span className="ellipsis ">{post.minGrade}</span>
                </div>
                <div className={`flex min-w-0 flex-col whitespace-nowrap `}>
                    <div className="mr-6 font-semibold">หน้าที่</div>
                    <div className="whitespace-pre-line px-5  ">
                        <div className="leading-[28px]">
                            <div className="w-full">{post?.duty.trim() || "-"}</div>
                        </div>
                        <br />
                    </div>
                </div>
                <div className={`flex min-w-0 flex-col whitespace-nowrap `}>
                    <div className="mr-6 font-semibold">ข้อกำหนด</div>
                    <div className="whitespace-pre-line px-5 py-4 ">
                        <div className="leading-[28px]">
                            <div className="w-full">{post?.requirement.trim() || "-"}</div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <TeachTable tables={post?.tables} />
            {isOverflow && (
                <div className="opacity-gradient absolute bottom-0  z-10 h-[100px] w-full cursor-pointer " onClick={() => handleClick()}>
                    <div className="absolute bottom-0 left-0 self-end text-sm text-primary-dark underline">
                        {isShowMore ? "ดูน้อยลง" : "ดูเพิ่มเติม"}
                        <FontAwesomeIcon icon={faChevronDown} className={`ml-4 text-text ${isShowMore ? "rotate-0" : "rotate-180"}`} />
                    </div>
                </div>
            )}
        </div>
    );
};

export const PostFallBack = () => {
    return (
        <div className="relative min-h-[500px] min-w-[768px] shrink-0 rounded-md  border bg-white px-10 py-8 text-xl shadow-md">
            <div className="flex-cen mb-10 w-full">
                <div className="flex-cen w-full justify-start space-x-4">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                        <div className="h-full w-full bg-slate-200"></div>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-3">
                            <span className="h-6 w-8 bg-gray-200"></span>
                            <span className="h-6 w-[225px] bg-gray-200"></span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="h-6 w-8 bg-gray-200"></span>
                            <span className="h-6 w-[225px] bg-gray-200"></span>
                        </div>
                    </div>
                </div>
                <div className="flex-cen space-x-3">
                    <div className="h-7 w-[100px] bg-zinc-100"></div>
                    <FontAwesomeIcon icon={faEllipsis} className="h-7 bg-zinc-50 px-4 text-lg text-gray-300 " />
                </div>
            </div>
            <div className="flex w-full space-x-5">
                <div className="w-full bg-white py-6 px-6">
                    <div className="flex w-full flex-col space-y-3">
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-3/4 bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-2/5 bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-3/5 bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-7 w-[130px] shrink-0">
                                <div className="h-full w-[70%] bg-gray-300"></div>
                            </div>
                            <div className="h-7 w-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="flex-col-cen w-[300px] shrink-0 space-y-3 bg-[#E7E7E7] py-4">
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-yellow-100"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-pink-200"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-green-200"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                    <div className="flex w-3/4 items-center space-x-3">
                        <div className="h-8 w-10 shrink-0 rounded-l-3xl bg-orange-200"></div>
                        <div className="h-8 w-full bg-white"></div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-8 right-16 text-3xl text-gray-300">
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    );
};

export default PostDesktop;
