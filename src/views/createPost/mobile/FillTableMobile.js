import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faClose } from "@fortawesome/free-solid-svg-icons";

const CreateTableMobile = () => {
    const addRef = useRef(null);

    return (
        <div className="flex w-full flex-col items-center ">
            <div className="text-xl font-bold text-secondary">ตารางเรียน</div>
            <FontAwesomeIcon icon={faPlusCircle} className="mt-6 text-2xl text-secondary" onClick={() => addRef.current.toggle()} />
            <Add ref={addRef} />
        </div>
    );
};

const Add = forwardRef((_, ref) => {
    const tl = useRef(null);
    const container = useRef(null);

    useImperativeHandle(ref, () => ({
        toggle: () => {
            tl.current.reversed() ? tl.current.play() : tl.current.reverse();
        },
        play: () => {
            tl.current.play();
        },
        reverse: () => {
            tl.current.reverse();
        },
    }));

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true, reversed: true }).to(container.current, { height: "200px" });
    }, []);

    return (
        <div ref={container} className="relative float-right mx-2 w-full overflow-hidden mt-4">
            <div className="absolute bottom-0 h-[200px] w-full rounded-md border-2 flex flex-col items-center">
                <FontAwesomeIcon onClick={() => ref.current.reverse()} icon={faClose} className="absolute right-0  p-2  text-xl " />
                <div className="flex flex-col items-center mt-10">
                    <span>เซค</span>
                    <input type="text" className="border-2 w-36 py-2 px-2 rounded-md mt-2" />
                </div>
            </div>
        </div>
    );
});

export default CreateTableMobile;
