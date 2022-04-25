import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

import gsap from "gsap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faInfo, faInfoCircle, faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

import { fileValidate } from "../../../../utils/fileUploadValidate";
import { fileIcon } from "../../../../utils/fileIcon";
import TranscriptView from "./TranscriptView";

const ProfileDetail = () => {
    const { user } = useSelector(state => state.user);
    const form = useForm({ mode: "all" });
    const onSubmit = data => {
        console.log(data);
    };
    const [canEdit, setCanEdit] = useState(true);
    const [isOpenTranscript, setIsOpenTranscript] = useState(false);

    const editDetail = useRef(null);
    const saveDetail = useRef(null);
    useLayoutEffect(() => {
        gsap.fromTo(editDetail.current, { xPercent: -100 }, { xPercent: 0, ease: "elastic.out(1,1)" });
        gsap.fromTo(saveDetail.current, { xPercent: -100 }, { xPercent: 0, ease: "elastic.out(1,1)" });
    }, []);

    return (
        <>
            {isOpenTranscript && (
                <TranscriptView transcript={user.transcript} isOpenTranscript={isOpenTranscript} setIsOpenTranscript={setIsOpenTranscript} />
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex  w-full max-w-[1000px] items-stretch space-x-5 ">
                <div className="w-full overflow-hidden">
                    <div ref={editDetail} className="relative flex w-full  flex-col space-y-4 rounded-md border-2 border-gray-200 p-8 pt-10">
                        <EditButton canEdit={canEdit} setCanEdit={setCanEdit} />
                        <Input {...form} canEdit={canEdit} name="firstname" label="ชื่อ" />
                        <Input {...form} canEdit={canEdit} name="lastname" label="นามสกุล" />
                        <Input {...form} canEdit={canEdit} name="department" label="ภาควิชา" />
                        <Input {...form} canEdit={canEdit} name="studentID" label="รหัสนักศึกษา" />
                        <Input {...form} canEdit={canEdit} name="email" label="อีเมล์" />
                        <Input {...form} canEdit={canEdit} name="password" label="รหัสผ่าน" />
                        <Input {...form} canEdit={canEdit} name="password" label="เบอร์โทร" />
                        <FileInput {...form} name="transcript" label="ทรานสคริปต์" setIsOpenTranscript={setIsOpenTranscript} />
                    </div>
                </div>
                <div className="w-full max-w-[350px]  overflow-hidden">
                    <div ref={saveDetail} className="2 flex w-full flex-col   items-center rounded-md border-2 border-gray-200  py-3">
                        <div className="h-40 w-40 shrink-0 overflow-hidden rounded-full">
                            <img src={user.imgURL} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="mt-4 text-xl font-semibold">
                            {user.firstname} {user.lastname}
                        </div>
                        <div className="text-base">{user.department}</div>
                        <div className="text-secondary underline ">{user.email}</div>
                        <button type="submit" disabled={canEdit} className="btn-orange mt-6 rounded-md px-4 py-[6px] text-lg font-semibold ">
                            บันทึกการแก้ไข
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

const EditButton = ({ canEdit, setCanEdit }) => {
    const firstTime = useRef(true);
    const container = useRef(null);
    const icon = useRef(null);
    const animate = useRef(null);
    const text = useRef(null);
    useLayoutEffect(() => {
        if (firstTime.current) {
            const textWidth = gsap.getProperty(text.current, "width");
            animate.current = gsap
                .timeline({ paused: true, reversed: true })
                .to(container.current, { width: `+=${textWidth}`, ease: "elastic.out(2,1)" })
                .to(icon.current, { rotate: "135deg", ease: "elastic.out(1,1)" }, "<0.1")
                .fromTo(text.current, { xPercent: 100 }, { xPercent: 0, ease: "elastic.out(1.2,1)", duration: 1 }, "<")
                .to(container.current, { ease: "linear", borderColor: "#74c0fc" }, "<");

            firstTime.current = false;
            return;
        }
        if (!canEdit) {
            animate.current.play();
        } else {
            animate.current.reverse();
        }
    }, [canEdit]);
    return (
        <div
            ref={container}
            className="absolute top-4 right-4  flex h-8 w-8 shrink-0  cursor-pointer items-center justify-start overflow-hidden rounded-[100px] border-2 p-2 "
            onClick={() => setCanEdit(e => !e)}>
            <div ref={icon} className="">
                <FontAwesomeIcon className="" icon={faPencil} />
            </div>
            <div ref={text} className="absolute right-0 text-text ">
                <div className="w-20">แก้ไขข้อมูล</div>
            </div>
        </div>
    );
};

const Input = ({ name, label, register, formState, canEdit, setValue, clearErrors }) => {
    const { user } = useSelector(state => state.user);
    const error = useMemo(() => {
        return formState.errors?.[name];
    }, [formState, name]);

    const icon = useRef(null);
    const firstTime = useRef(true);
    const animate = useRef(null);
    useEffect(() => {
        setValue(name, user?.[name]);
    }, [user, canEdit, setValue, name]);

    useLayoutEffect(() => {
        if (firstTime.current) {
            animate.current = gsap
                .timeline({ paused: true, reversed: true })
                .fromTo(icon.current, { xPercent: -100 }, { xPercent: 0, ease: "elastic.out(1,1)", duration: 1 }, "<");
            firstTime.current = false;
            return;
        }
        if (!canEdit) {
            animate.current.play();
        } else {
            clearErrors();
            animate.current.reverse();
        }
    }, [canEdit, clearErrors]);
    return (
        <div className="relative flex items-center">
            <div className="w-[110px]">{label}</div>
            <input
                disabled={canEdit}
                {...register(name, {
                    validate: {
                        empty: value => value?.length > 0 || "กรุณากรอกด้วยไอสัส",
                    },
                })}
                type="text"
                className={` cool-input w-full max-w-[400px] rounded-md border-[1.7px]  px-2 py-1 disabled:text-text-light ${
                    error ? "border-red-500" : "border-gray-200"
                }`}
            />
            <div className="overflow-hidden">
                <button type="button" disabled={canEdit} className="disabled:border-none" ref={icon} onClick={() => setValue(name, "")}>
                    <FontAwesomeIcon icon={faTrashAlt} className="px-2 text-red-500" />
                </button>
            </div>
            {error && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-red-500" />
                    <div className="absolute text-xs text-red-500">{error.message}</div>
                </div>
            )}
        </div>
    );
};

const FileInput = ({ name, label, register, formState, watch, resetField, setIsOpenTranscript }) => {
    const { user } = useSelector(state => state.user);
    const error = useMemo(() => {
        return formState.errors?.[name];
    }, [formState, name]);

    const fileWatch = watch("file");
    const [fileInputName, setFileInputName] = useState(null);
    useEffect(() => {
        console.log(fileWatch?.[0]?.name);
        setFileInputName(fileWatch?.[0]?.name);
    }, [fileWatch]);

    return (
        <div className="relative flex items-center">
            <div className="w-[110px]">{label}</div>
            {user.transcript ? (
                <div onClick={() => setIsOpenTranscript(true)} className="text-secondary underline cursor-pointer">
                    ดูทรานสคริปต์
                </div>
            ) : (
                <>
                    <input className="hidden" type="file" {...register("file", fileValidate)} id="transcript" />

                    <label
                        htmlFor="transcript"
                        className={` btn-white flex  items-center rounded-md border-[1.7px]  px-2 py-1 disabled:text-text-light ${
                            error ? "border-red-500" : ""
                        }`}>
                        <FontAwesomeIcon className="mr-2" icon={faFileUpload} />
                        <div>อัพโหลดทรานสคริปต์</div>
                    </label>

                    {error && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-red-500" />
                            <div className="absolute text-xs text-red-500">{error.message}</div>
                        </div>
                    )}
                    {fileInputName && (
                        <div className="ml-4 flex min-w-0  items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-normal text-text">
                            <FontAwesomeIcon icon={fileIcon(fileInputName)} />
                            <div className="ellipsis ml-2 max-w-[100px] ">{fileInputName}</div>
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
                </>
            )}
        </div>
    );
};

export default ProfileDetail;
