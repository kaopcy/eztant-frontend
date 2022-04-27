import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { useRequestPost } from "../../../../composables/interact/useRequestPost";
import DisclosureAnimate from "../../../../component/utils/DisclosureAnimate";
import { getUser } from "../../../../store/actions/authAction";
import { useDispatch } from "react-redux";

const ApplyPopup = ({ setSelectedPost, selectedPost, setIsRequest, flash , setRequestedSection }) => {
    const overlay = useRef(null);
    const mainContainer = useRef(null);

    const dispatch = useDispatch()
    const onSuccess = () => {
        dispatch(getUser())
        setIsRequest(true);
        flash("#22C55E");
        flashPopupContainer("#22C55E");
        // gsap.to(mainContainer.current, { backgroundColor: "#22C55E" });
    };
    const { mutate, isLoading, error, isSuccess } = useRequestPost(onSuccess);
    useEffect(() => {
        if (error) console.log(error.response.data.message);
    }, [error]);
    const tl = useRef(null);

    useLayoutEffect(() => {
        gsap.set(mainContainer.current, { opacity: 0, y: "100px", scale: 0.8 });
    }, []);

    const flashPopupContainer = color => {
        gsap.fromTo(
            mainContainer.current,
            { outlineStyle: "solid", outlineWidth: 5, outlineColor: color || "#74c0fc" },
            { outlineWidth: 0, overwrite: true, ease: "power4.out", duration: 1.5, delay: 0.3 }
        );
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        tl.current = gsap
            .timeline({
                paused: true,
                onReverseComplete: () => {
                    document.body.style.overflow = "auto";
                    setSelectedPost(false);
                },
            })
            .to(overlay.current, { opacity: 0.5, duration: 0.3 })
            .to(mainContainer.current, { opacity: 1, y: 0, scale: 1, duration: 0.3 }, "<");
        tl.current.play();
        return () => {
            tl.current.kill();
            document.body.style.overflow = "auto";
        };
    }, [setSelectedPost]);

    const handleOnClose = () => {
        tl.current.reverse();
    };
    const [selectedSec, setSelectedSec] = useState(selectedPost.tables[0].section);

    const selectedSectionID = useMemo(() => {
        return selectedPost.tables.find(e => e.section === selectedSec)._id;
    }, [selectedSec, selectedPost]);

    useEffect(() => {
        console.log(`selectedsec: ${selectedSectionID}`);
    }, [selectedSectionID]);

    const handleRequestPost = () => {
        setRequestedSection(selectedSectionID)
        mutate(selectedSectionID);
    };

    return (
        <div className="flex-col-cen fixed bottom-0 right-0 z-[1000] h-screen w-full text-sm text-text sm:text-base">
            <div ref={overlay} className="absolute h-full w-full bg-black opacity-0" onClick={() => handleOnClose()}></div>
            <div className="absolute  h-[320px] min-w-[500px] rounded-lg bg-white" ref={mainContainer}>
                 {isSuccess ? (
                    <div className="flex-col-cen h-full w-full">สำเร็จ</div>
                ) : (
                    <div className="relative flex h-full w-full flex-col items-center">
                        <FontAwesomeIcon icon={faXmark} onClick={() => handleOnClose()} className="mt-4 mr-4 self-end text-3xl text-text" />
                        <div className="mt-2 text-2xl font-bold text-secondary ">สมัครเป็น TA</div>
                        <div className="mt-2 h-[3px] w-[200px] bg-gray-200"></div>
                        <div className="mt-8 font-semibold">
                            วิชา <b>{selectedPost.subjectName}</b>
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                            <div className="">เลือกเซคที่ต้องการสมัคร</div>
                            <Disclosure selectedSec={selectedSec} setSelectedSec={setSelectedSec} section={selectedPost.tables.map(e => e.section)} />
                        </div>
                        <div onClick={() => handleRequestPost()} className="btn-orange mt-12 rounded-lg px-16 py-2 relative">
                            {error && <div className="text-sm text-red-500 absolute bottom-[120%] left-1/2 -translate-x-1/2  whitespace-nowrap">{error.response.data.message}</div>}
                            สมัคร TA
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Disclosure = ({ section, selectedSec, setSelectedSec }) => {
    const [open, setOpen] = useState(false);
    return (
        <DisclosureAnimate toggle={open}>
            {({ childRelativeContainer, childAbsoluteContainer }) => (
                <div
                    className="relative z-10 flex w-[130px] cursor-pointer items-center justify-between space-x-2 rounded-md bg-white px-2 py-1 outline outline-1 outline-text-light"
                    onClick={() => setOpen(e => !e)}>
                    <span className="ellipsis ">{section.filter(e => selectedSec === e)[0]} </span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    <div className="absolute top-[calc(100%+1px)] -left-2 w-full ">
                        <div className="relative w-full self-end overflow-hidden " ref={childRelativeContainer}>
                            <div ref={childAbsoluteContainer} className="absolute bottom-0 left-0 flex w-full flex-col border bg-white py-2">
                                {section.map(e => {
                                    const active = e === selectedSec;
                                    return (
                                        <div
                                            className={`w-full  py-1 px-2  ${active ? "bg-primary text-white " : "hover:bg-gray-100 "} `}
                                            onClick={() => setSelectedSec(e)}
                                            key={e}>
                                            {e}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DisclosureAnimate>
    );
};

export default ApplyPopup;
