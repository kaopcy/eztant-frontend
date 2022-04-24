import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {  faUpload, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { fileIcon } from "../../../utils/fileIcon";
import { fileValidate } from "../../../utils/fileUploadValidate";

const EvidenceSend = () => {
    const { user } = useSelector(state => state.user);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!image) return;
        const objectURL = URL.createObjectURL(image);
        setPreview(objectURL);

        return () => URL.revokeObjectURL(objectURL);
    }, [image]);

    const onSelectImage = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null);
            return;
        }
        setImage(e.target.files[0]);
    };

    const {
        register,
        resetField,
        formState: { errors },
        watch,
    } = useForm({ mode: "onChange" });

    const watchedFile = watch("file");
    useEffect(() => {
        if (!watchedFile || watchedFile.length === 0) {
            setImage(null);
            return;
        }
        setImage(watchedFile[0]);
    }, [watchedFile]);

    return (
        <div className="flex w-full max-w-[350px]  flex-col px-6 py-10 text-text">
            <div className="flex items-center">
                <div className="mr-2 h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <img src={user.imgURL} alt="" className="h-full w-full rounded-full" />
                </div>
                <div className="flex flex-col items-start ">
                    <div className="text-lg  font-semibold">
                        {user.firstname} {user.lastname}
                    </div>
                    <div className="-mt-1 text-sm">{user.studentID}</div>
                </div>
            </div>
            {image ? (
                <div className="mt-10 flex w-full flex-col ">
                    <div className="mb-3 flex w-full items-center justify-between">
                        <div className="text-xl font-semibold">หลักฐานการทำงาน</div>
                        <div className="text-xs text-text-light">อัปโหลดเมื่อ 1 ชั่วโมงที่แล้ว</div>
                    </div>
                    <div className=" flex h-[200px] items-center justify-center overflow-hidden bg-slate-100">
                        {image && image["type"].split("/")[0] === "image" ? (
                            <img src={preview} alt="" className="z-20 h-full object-cover" />
                        ) : (
                            <div className="absolute z-10">ไม่สามารถ preview ได้</div>
                        )}
                    </div>
                    {errors?.file && <div className="">{errors?.file?.message}</div>}
                    {image && (
                        <div className=" flex min-w-0 mt-4  items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-normal text-text self-start" >
                            <FontAwesomeIcon icon={fileIcon(image.name)} />
                            <div className="ellipsis ml-2 max-w-[200px] ">{image.name}</div>
                            <FontAwesomeIcon
                                icon={faXmarkCircle}
                                className="ml-2 text-xs"
                                onClick={() => {
                                    setImage(null);
                                    setPreview(null);
                                    resetField("file");
                                }}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <input {...register("file", fileValidate)} type="file" className="hidden" id="file" />
                    <label htmlFor="file" className="btn-white mt-5 flex self-center rounded-md border-2 px-3 py-2">
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        <div className="">อัปโหลดหลักฐาน</div>
                    </label>
                </>
            )}
        </div>
    );
};

export default EvidenceSend;
