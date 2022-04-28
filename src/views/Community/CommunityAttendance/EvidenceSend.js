import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { faCircleCheck, faUpload, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { fileIcon } from "../../../utils/fileIcon";
import { attendanceValidate } from "../../../utils/fileUploadValidate";

import { useSelectedDay, useToday, useSetSelectedDay } from "./AttendanceContext";
import { DAY_COLOR, DAY_FULL_TH } from "../../../generalConfig";
import { useFetchCommunityByID } from "../../../composables/fetch/useFetchCommunity";
import { useFetchAttendentByDay } from "../../../composables/fetch/useFetchAttendence";
import { useParams } from "react-router-dom";
import { useUploadAttendance } from "../../../composables/interact/useAttendence";

const EvidenceSend = () => {
    const { user } = useSelector(state => state.user);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const selectedDay = useSelectedDay();
    const today = useToday();

    const { id } = useParams();
    const { data: community } = useFetchCommunityByID();

    const { data: attendent, mutate: fetchAttenceByID, isLoading: fetchAttenLoading } = useFetchAttendentByDay();
    const { mutate: uploadAttendance, isLoading: uploadLoading } = useUploadAttendance(() => {
        fetchAttenceByID({ commuID: id, date: selectedDay });
    });

    const isHaveTeach = useMemo(
        () =>
            community?.data?.recruit_post_id?.schedules
                ?.filter(e => e.day === selectedDay.toLocaleDateString("en", { weekday: "long" }).toLowerCase())
                .some(e => e.accepted.some(k => k._id === user._id)),
        [selectedDay, community, user]
    );

    const isFuture = useMemo(() => selectedDay.getTime() > today.getTime(), [selectedDay, today]);

    const isChecked = useMemo(() => attendent?.data?.filter(e => e?.owner_id === user._id)?.[0]?.check_by_teacher, [attendent, user]);

    useEffect(() => {
        if (!image) return;
        const objectURL = URL.createObjectURL(image);
        setPreview(objectURL);

        return () => URL.revokeObjectURL(objectURL);
    }, [image]);

    useEffect(() => {
        fetchAttenceByID({ commuID: id, date: selectedDay });
    }, [fetchAttenceByID, id, selectedDay]);

    const isAlreadyAttended = useMemo(() => {
        return attendent?.data?.some(e => e?.owner_id === user?._id);
    }, [attendent, user]);

    const onSelectImage = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null);
            return;
        }
        setImage(e.target.files[0]);
    };

    const {
        register,
        clearErrors,
        resetField,
        formState: { errors, isValid },
        watch,
        handleSubmit,
    } = useForm({ mode: "onChange" });

    const watchedFile = watch("file");
    useEffect(() => {
        if (!watchedFile || watchedFile.length === 0) {
            setImage(null);
            return;
        }
        setImage(watchedFile[0]);
    }, [watchedFile]);

    const { id: commuID } = useParams();
    const onSubmit = data => {
        uploadAttendance({ commuID: commuID, attend_date: selectedDay });
    };

    return (
        <div className={`relative flex h-full w-full max-w-[350px] flex-col px-6 py-10 text-text `}>
            {(isFuture || !isHaveTeach || isChecked) && (
                <div className=" flex-col-cen absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    {isChecked && (
                        <div className="z-10 mb-14 flex items-center  space-x-3 text-4xl font-semibold text-white">
                            <div className="">เช็คชื่อแล้ว</div>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    )}
                </div>
            )}
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

            {fetchAttenLoading || uploadLoading ? (
                <div className=" mt-10 w-full text-center">กำลังโหลด...</div>
            ) : isAlreadyAttended ? (
                <>
                    <div className=" mt-10 flex h-[200px] items-center justify-center overflow-hidden bg-slate-100">
                        <div className="absolute z-10">ไม่สามารถ preview ได้</div>
                    </div>
                    <div className="mt-2 flex items-center">
                        <div className="mr-2">สถานะ: </div>
                        <div className="text-green-500">{isChecked ? "เช็คชื่อแล้ว" : "อัพโหลดสำเร็จ"}</div>
                    </div>
                </>
            ) : image ? (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex w-full flex-col ">
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
                    {image && (
                        <div className=" mt-4 flex min-w-0  items-center self-start rounded-full bg-gray-200 px-3 py-1 text-sm font-normal text-text">
                            <FontAwesomeIcon icon={fileIcon(image.name)} />
                            <div className="ellipsis ml-2 max-w-[200px] ">{image.name}</div>
                            <FontAwesomeIcon
                                icon={faXmarkCircle}
                                className="ml-2 text-xs"
                                onClick={() => {
                                    setImage(null);
                                    setPreview(null);
                                    resetField("file");
                                    clearErrors();
                                }}
                            />
                        </div>
                    )}
                    <div className="mt-5 flex items-center">
                        <button
                            type="submit"
                            disabled={Object.values(errors).length}
                            className={`btn-orange  flex self-center rounded-md border-2 px-3 py-2 ${
                                !isHaveTeach && "!border-gray-200 !text-gray-300 "
                            }`}>
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />
                            <div className="">อัปโหลดหลักฐาน</div>
                        </button>
                        {errors?.file && <div className="ml-3 text-sm text-red-500">{errors?.file?.message}</div>}
                    </div>
                </form>
            ) : (
                <div className="self-center">
                    <input disabled={!isHaveTeach} {...register("file", attendanceValidate)} type="file" className="hidden" id="file" />
                    <label
                        htmlFor="file"
                        className={`btn-white mt-5 flex self-center rounded-md border-2 px-3 py-2 ${
                            !isHaveTeach && "!border-gray-200 !text-gray-300 "
                        }`}>
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        <div className="">อัปโหลดหลักฐาน</div>
                    </label>
                </div>
            )}
        </div>
    );
};

export default EvidenceSend;
