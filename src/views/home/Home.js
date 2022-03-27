import React from "react";
import { ReactComponent as ManyPeopleSvg } from "../../assets/images/many-people.svg";
import { default as Post } from "./Components/Post/Post";
const Home = () => {
    return (
        <div className="relative flex w-full flex-col bg-white pb-10">
            <div className="relative mb-10 flex min-h-[calc(100vh-80px)] w-full flex-col  bg-white px-6 md:flex-row md:px-10">
                <WelcomQuote />
                <ImageQuote />
            </div>
            <Post/>
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

    return (
        <div className="flex flex-col items-center justify-center md:w-[55%] md:space-y-16 ">
            {images.map(image => (
                <div className={`relative flex w-full ${image.pos}`} key={image.url}>
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
    const Text = ({ children }) => {
        return (
            <div className="flex flex-[1] whitespace-nowrap text-[30px] font-semibold tracking-[2px] text-text xs:text-[45px] md:text-[30px] 2md:text-[45px] lg:text-[47px] xl:text-[50px]">
                {children}
            </div>
        );
    };
    return (
        <div className="flex flex-col items-center justify-center self-end py-14 md:w-[45%] md:self-center">
            <div className="flex justify-center space-x-4 md:w-[500px]">
                <div className="flex flex-col">
                    <Text>"หาผู้ช่วย</Text>
                    <Text>&nbsp;&nbsp;ต้องที่นี่</Text>
                </div>
                <div className="flex flex-col">
                    <Text>แบบอีซี่</Text>
                    <Text>อีซี่แทนต์"</Text>
                </div>
            </div>
            <div className="self-center text-[15px] tracking-wider text-text 2md:text-[16px] lg:text-[18px] xl:text-[21px]">
                ยินดีต้อนรับอาจารย์ 'ปิยชัย แก้วชุ่ม'
            </div>
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
