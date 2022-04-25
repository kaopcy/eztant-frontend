import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Member = () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = useRef(null);

    const container = useRef(null);
    const overlay = useRef(null);

    const kaoRef = useRef(null);
    const nabinRef = useRef(null);
    const perthRef = useRef(null);
    const boomRef = useRef(null);
    const donutRef = useRef(null);

    const member = [
        {
            name: "ปิยชัย แก้วชุ่ม",
            id: "63010604",
            img: "kao.jpg",
            role: "frontend",
            ref: kaoRef,
        },
        {
            name: "พรหมพิริยะ เจริญพานทองดี",
            id: "63010648",
            img: "boom.jpg",
            role: "frontend",
            ref: boomRef,
        },
        {
            name: "พิชชาภา เวียงทอง",
            id: "63010679",
            img: "perth.jpg",
            role: "frontend",
            ref: perthRef,
        },
        {
            name: "นาวีฮาน เต๊ะหมาน",
            id: "63010xxx",
            img: "kao.jpg",
            role: "backend",
            ref: nabinRef,
        },
        {
            name: "ธีรพัฒน์ เกตุสิงห์น้อย",
            id: "63010467",
            img: "kao.jpg",
            role: "backend",
            ref: donutRef,
        },
    ];

    useEffect(() => {
        const properties = [
            {
                autoAlpha: 0,
                scale: 0,
                xPercent: 100,
            },
            {
                autoAlpha: 1,
                scale: 1,
                xPercent: 0,
                ease: "elastic.out(2,1)",
                duration: 0.5,
            },
        ];
        tl.current = gsap
            .timeline({
                scrollTrigger: {
                    trigger: container.current,
                    pin: true,
                    start: "60px bottom",
                    end: "bottom bottom",
                    scrub: 2,
                },
            })
            .fromTo(
                overlay.current,
                {
                    autoAlpha: 0,
                },
                { autoAlpha: 1 }
            )
            .to(container.current, { yPercent: -50 }, "<")
            .fromTo(kaoRef.current, ...properties, "<")
            .fromTo(boomRef.current, ...properties, "<0.1")
            .fromTo(perthRef.current, ...properties, "<0.1")
            .fromTo(nabinRef.current, ...properties, "<0.1")
            .fromTo(donutRef.current, ...properties, "<0.1");
    }, []);

    return (
        <>
            <div ref={overlay} className="fixed top-0 left-0 z-[1000] h-screen w-screen bg-white"></div>
            <div ref={container} className="z-[1001] h-[1200px] w-full text-text">
                <div className="relative flex w-full flex-col items-center">
                    <div className="mb-6 h-[60px] text-center text-4xl font-bold text-text ">ทำความรู้จักผู้จัดทำ</div>
                    <div className="flex w-full max-w-[1300px] flex-wrap justify-center ">
                        {member.map(person => (
                            <MockUser key={person.id} {...person} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const MockUser = forwardRef(({ name, id, img, role }, ref) => {
    const imgRef = useRef(null);
    const imgContainer = useRef(null);
    const textRef = useRef(null);
    const overlay = useRef(null);
    const roleRef = useRef(null);
    const divider = useRef(null);
    const animate = useRef(null);

    const iconRef = useRef([]);

    useEffect(() => {
        const imgref = imgContainer.current;
        animate.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(imgContainer.current, { yPercent: -20, height: "300px", width: "250px", borderRadius: "20px" }, "<")
            .to(imgRef.current, { scale: 2 }, "<")
            .to(textRef.current, { y: -130, color: "white", ease: "elastic.inOut(1,1)", duration: 1 }, "<")
            .to(roleRef.current, { scale: 1.4, color: "#FF613A" }, "<")
            .to(overlay.current, { opacity: 1 }, "<")
            .fromTo(
                iconRef.current,
                { opacity: 0, yPercent: -100 },
                { opacity: 1, yPercent: 0, stagger: { amount: 0.2, each: 0.2 }, ease: "elastic.out(1.6,0.8)", duration: 0.5 },
                "<0.4"
            )
            .to(divider.current, { width: "70%", ease: "power4.out" }, "<");
        const onHover = e => {
            animate.current.play();
        };
        const onOut = e => {
            animate.current.reverse();
        };
        imgref.addEventListener("mouseover", onHover);
        imgref.addEventListener("mouseleave", onOut);
        return () => {
            imgref.removeEventListener("mouseover", onHover);
            imgref.removeEventListener("mouseleave", onOut);
        };
    }, []);
    return (
        <div ref={ref} className="haha -mb-4 flex w-[33%] flex-col items-center text-lg ">
            <div ref={roleRef} className="z-10 mb-2 text-xl font-bold uppercase text-secondary ">
                {role}
            </div>
            <div ref={imgContainer} className="relative h-44  w-44  overflow-hidden rounded-[90px] ">
                <img ref={imgRef} src={require(`../../../assets/members/${img}`)} alt="" className="h-full w-full object-cover " />
                <div ref={overlay} className="flex-col-cen absolute top-0 left-0 h-full w-full   text-white opacity-0">
                    <div className="flex-cen space-x-4">
                        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
                        <div className="cursor-pointer" ref={e => (iconRef.current[0] = e)}>
                            <FontAwesomeIcon className="icon-stagger z-10 text-3xl text-white" icon={faInstagram} />
                        </div>
                        <div className="cursor-pointer" ref={e => (iconRef.current[1] = e)}>
                            <FontAwesomeIcon className="icon-stagger z-10 text-3xl text-white" icon={faFacebook} />
                        </div>
                        <div className="cursor-pointer" ref={e => (iconRef.current[2] = e)}>
                            <FontAwesomeIcon className="icon-stagger z-10 text-3xl text-white" icon={faGithub} />
                        </div>
                    </div>
                    <div ref={divider} className="z-10 mt-4 h-[1px] w-0 bg-white"></div>
                </div>
            </div>
            <div ref={textRef} className="flex-col-cen pointer-events-none flex text-text">
                <div className="mt-2 text-lg ">{name}</div>
                <div className="-mt-1">{id}</div>
            </div>
        </div>
    );
});

export default Member;
