import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TranscriptView = ({ transcript, setIsOpenTranscript, isOpenTranscript }) => {
    const [isloading, setIsloading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsloading(false);
        }, 500);
    });

    const sortedTranscript = useMemo(() => {
        let newTranscript = [];
        let maxYear = 4;
        let maxSemestry = 2;
        for (let year = 1; year <= maxYear; year++) {
            for (let semestry = 1; semestry <= maxSemestry; semestry++) {
                newTranscript.push({
                    year: year,
                    semestry: semestry,
                    transcript: transcript.filter(e => e.studyYear === year && e.studySemestry === semestry),
                });
            }
        }
        return newTranscript;
    }, [transcript]);

    const isReady = useMemo(() => {
        if (!sortedTranscript || sortedTranscript.length <= 0 || isloading) return false;
        return true;
    }, [sortedTranscript, isloading]);

    const container = useRef(null);
    const overlay = useRef(null);
    useLayoutEffect(() => {
        gsap.timeline()
            .fromTo(container.current, { autoAlpha: 0, width: 0 }, { width: "auto", autoAlpha: 1 })
            .fromTo(overlay.current, { opacity: 0 }, { opacity: 0.5, ease: "power4.inOut" }, "<");
    }, []);
    const close = () => {
        gsap.timeline({ onComplete: () => setIsOpenTranscript(false), defaults: { overwrite: true } })
            .to(container.current, { height: 0, autoAlpha: 0 })
            .to(overlay.current, { autoAlpha: 0, ease: "power4.inOut" }, "<");
    };

    useLayoutEffect(() => {
        if (!isReady) return;
        gsap.timeline()
            .fromTo(container.current, { height: 138 }, { height: "500px", ease: "elastic.out(1,1)" })
            .fromTo(
                ".stagger-subject-animation",
                { xPercent: 100 },
                { xPercent: 0, stagger: { amount: 0.3, each: 0.3 }, ease: "elastic.out(1,1)" },
                "<"
            );
    }, [isReady]);

    return (
        <>
            <div ref={overlay} onClick={() => close()} className="fixed top-0 left-0 z-[1000] h-screen w-screen  bg-black opacity-10"></div>
            <div
                ref={container}
                className="fixed z-[1001] flex  flex-col items-center overflow-hidden overflow-y-auto whitespace-nowrap rounded-md border-[2px] border-secondary bg-white py-10 px-32">
                <div className="self-center text-lg font-bold text-secondary">ทรานสคริปต์ของคุณ</div>
                <FontAwesomeIcon icon={faXmark} className="absolute top-2 left-2 p-2 text-lg text-red-500" onClick={() => close()} />
                <div className="flex justify-center">
                    <div className="w-[400px] shrink-0 text-secondary">วิชา</div>
                    <div className="flex-col-cen w-[50px] shrink-0 text-secondary">เกรด</div>
                </div>
                {!isReady ? (
                    <div className="stagger-subject-animation  whitespace-nowrap text-lg text-text-light">กำลังโหลด...</div>
                ) : (
                    sortedTranscript.map(
                        year =>
                            year.transcript.length > 0 && (
                                <div className="mt-2 flex-col" key={uuid()}>
                                    <div className="flex w-full items-center">
                                        <div className="h-[1px] w-full bg-gray-200"></div>
                                        <div className="flex items-center whitespace-nowrap text-xs text-text-light">
                                            ปี{year.year} เทอม{year.semestry}
                                        </div>
                                        <div className="h-[1px] w-full bg-gray-200"></div>
                                    </div>
                                    {year.transcript.map(e => (
                                        <EachSubject transcript={e} key={uuid()} />
                                    ))}
                                </div>
                            )
                    )
                )}
            </div>
        </>
    );
};

const EachSubject = ({ transcript }) => {
    return (
        <div className="stagger-subject-animation mb-3 flex justify-center">
            <div className="w-[400px] text-text ">
                {transcript.subjectID} {transcript.subjectName}
            </div>
            <div className="flex-col-cen w-[50px] text-text">{transcript.grade}</div>
        </div>
    );
};

export default TranscriptView;
