import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as ManyPeopleSvg } from "../../assets/images/many-people.svg";
import { default as Post } from "./Components/Post/Post";
const Home = () => {
    return (
        <div className="relative flex w-full flex-col bg-white pb-10">
            <div className="relative mb-10 flex min-h-[calc(100vh-80px)] w-full flex-col  bg-white px-6 md:flex-row md:px-10">
                <WelcomQuote />
                <ImageQuote />
            </div>
            <Post />
            <div className="h-screen "></div>
        </div>
    );
};

const ImageQuote = () => {
    const images = [
        {
            url: "/images/home/ease.png",
            pos: "md:justify-start  justify-start",
            text: "อาจารย์สามารถโพสต์ เพื่อหา TA ประจำวิชาได้ง่ายๆ",
        },
        {
            url: "/images/home/working.png",
            pos: "md:justify-start  justify-center",
            text: "นักศึกษาสามารถสมัครเป็น TA ในวิชาที่สนใจได้อย่างง่ายดาย",
        },
        {
            url: "/images/home/community.png",
            pos: "md:justify-start  justify-end",
            text: "มีคอมมูนิตี้ให้สำหรับอาจารย์และ TA\nไว้แจ้งข้อมูลข่าวสารได้ตรงกันและทั่วถึง",
        },
    ];

    useEffect(() => {
        const tl = gsap.timeline();
        tl.from(".stagger-image-quote", {
            yPercent: i => (i + 1) * -70,
            opacity: 0,
            delay: 2,
            duration: 1,
            ease: "power4.out",
            stagger: { amount: 0.2 },
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center md:w-[55%] md:space-y-16 ">
            {images.map(image => (
                <div className={`stagger-image-quote relative flex w-full ${image.pos}`} key={image.url}>
                    <div className="relative flex w-1/3 items-center justify-center space-y-3 md:w-full md:space-x-6 md:space-y-0">
                        <img src={image.url} alt="" className="w-[130px] object-cover md:w-[150px] lg:w-[160px] xl:w-[180px]" key={image.url} />
                        <div className="absolute top-full left-1/2 w-full -translate-x-1/2 px-4 text-center leading-[0] sm:leading-[1.3] md:relative md:top-0 md:left-0 md:max-w-md md:translate-x-0 md:px-0 md:text-left">
                            <span className=" text-sm font-medium  tracking-wider text-text sm:text-base md:text-xl 2md:text-2xl ">{image.text}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const WelcomQuote = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector(state => state.user);
    const fadeBackgroundRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.to(fadeBackgroundRef.current, { yPercent: 100, autoAlpha: 1, ease: "power2.inOut", duration: 1 })
            .from(".welcome-quote-animation", { xPercent: 250, duration: 0.8, ease: "power1.in" })
            .to(fadeBackgroundRef.current, { width: 0, transformOrigin: "0% 100%", autoAlpha: 0, ease: "power2.in", duration: 0.8 }, "<")
            .from(".welcome-name-animation", { yPercent: -130 });
        return () => tl.kill();
    }, []);

    const Text = ({ children }) => {
        return (
            <div className=" flex flex-[1] whitespace-nowrap text-[30px] font-semibold tracking-[2px] xs:text-[45px] md:text-[30px] 2md:text-[45px] lg:text-[47px] xl:text-[50px]">
                {children}
            </div>
        );
    };
    return (
        <div className="relative flex flex-col items-center  justify-center self-end py-14 md:w-[45%] md:self-center">
            <div className="relative flex justify-center  space-x-4 overflow-hidden md:w-[500px]">
                <div ref={fadeBackgroundRef} className="flex-cen absolute inset-0 h-full -translate-y-full overflow-hidden">
                    <img className="h-full" src={require("../../assets/logos/eztant.png")} alt="" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <div className="welcome-quote-animation text-text">
                        <Text>"หาผู้ช่วย</Text>
                        <Text>&nbsp;&nbsp;ต้องที่นี่</Text>
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <div className="welcome-quote-animation text-text">
                        <Text>แบบอีซี่</Text>
                        <Text>อีซี่แทนต์"</Text>
                    </div>
                </div>
            </div>
            {user && (
                <div className="overflow-hidden">
                    <div className="welcome-name-animation self-center text-[15px] tracking-wider text-text 2md:text-[16px] lg:text-[18px] xl:text-[21px]">
                        <span>
                            ยินดีต้อนรับอาจารย์ '{user.name?.title} {user.name?.first} {user.name?.last}'
                        </span>
                    </div>
                </div>
            )}
            {!user && (
                <div className="mt-10 overflow-hidden">
                    <div className="welcome-name-animation flex-cen space-x-6 xl:space-x-10">
                        <div
                            className="btn-orange rounded-md px-6 py-2 lg:text-2xl "
                            onClick={() => {
                                navigate("/register", {
                                    state: {
                                        backgroundLocation: location,
                                    },
                                });
                            }}>
                            ลงทะเบียน
                        </div>
                        <div
                            className="btn-white rounded-md px-6 py-2 lg:text-2xl"
                            onClick={() => {
                                navigate("/login", {
                                    state: {
                                        backgroundLocation: location,
                                    },
                                });
                            }}>
                            เข้าสู่ระบบ
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const BackgroundImage = () => {
    return (
        <div className="relative min-h-[200px] w-full overflow-x-hidden">
            <ManyPeopleSvg className="min-w-[100vw] bg-white" />
        </div>
    );
};

export default Home;
