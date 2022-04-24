import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { ReactComponent as DotHexagon } from "../../../assets/community/SVG/Asset 1.svg";
import { ReactComponent as Ring } from "../../../assets/community/SVG/Asset 2.svg";
import { ReactComponent as Cross } from "../../../assets/community/SVG/Asset 3.svg";
import { ReactComponent as HexagonSmall } from "../../../assets/community/SVG/Asset 4.svg";
import { ReactComponent as HexagonOrangeBig } from "../../../assets/community/SVG/Asset 5.svg";
import { ReactComponent as HexagonOrangeDonut } from "../../../assets/community/SVG/Asset 6.svg";
import { ReactComponent as HexagonWhiteDonutTop } from "../../../assets/community/SVG/Asset 7.svg";
import { ReactComponent as HexagonWhiteDonutBot } from "../../../assets/community/SVG/Asset 7.svg";
import { ReactComponent as HexagonOrangeBorder } from "../../../assets/community/SVG/Asset 8.svg";

const CommunitySuggest = () => {
    const backgroundRef = useRef(null);
    const dotHexagonRef = useRef(null);
    const ringRef = useRef(null);
    const crossRef = useRef(null);
    const hexagonSmallRef = useRef(null);
    const hexagonOrangeBigRef = useRef(null);
    const hexagonOrangeDonutRef = useRef(null);
    const hexagonWhiteDonutBotRef = useRef(null);
    const hexagonWhiteDonutTopRef = useRef(null);
    const hexagonOrangeBorderRef = useRef(null);

    useLayoutEffect(() => {
        const randomX = random(30, 50);
        const randomY = random(40, 60);
        const randomAngle = random(8, 12);

        const randomTime = random(3, 5);
        const randomTime2 = random(5, 10);

        const floats = gsap.utils.toArray(".random-float");
        floats.forEach(float => {
            gsap.set(float, {
                x: randomX(-1),
                y: randomX(1),
                rotation: randomAngle(-1),
            });
            moveX(float, 1);
            moveY(float, -1);
            rotate(float, 1);
        });

        function rotate(target, direction) {
            gsap.to(target, {
                rotation: randomAngle(direction),
                ease: "sine.out",
                duration: randomTime2(),
                onComplete: rotate,
                onCompleteParams: [target, direction * -1],
            });
        }

        function moveX(target, direction) {
            gsap.to(target, {
                x: randomX(direction),
                ease: "sine.inOut",
                duration: randomTime(),
                onComplete: moveX,
                onCompleteParams: [target, direction * -1],
            });
        }

        function moveY(target, direction) {
            gsap.to(target, {
                y: randomY(direction),
                ease: "sine.inOut",
                duration: randomTime(),
                onComplete: moveY,
                onCompleteParams: [target, direction * -1],
            });
        }

        function random(min, max) {
            const delta = max - min;
            return (direction = 1) => (min + delta * Math.random()) * direction;
        }
    }, []);

    return (
        <div className="relative w-full overflow-hidden">
            <img
                ref={backgroundRef}
                className="z-0 w-full"
                src={require("../../../assets/community/SVG/SL_043021_42650_12 [Converted].jpg")}
                alt=""
            />
            <Cross ref={crossRef} className=" random-float absolute top-[20%] left-[5%] z-10 h-[67%] " />
            <Ring ref={ringRef} className=" random-float absolute top-[25%] right-[23%] z-10 h-[35%] " />
            <HexagonSmall ref={hexagonSmallRef} className=" random-float absolute top-1/2 right-1/2 z-10 h-[60%] " />
            <HexagonOrangeBig ref={hexagonOrangeBigRef} className=" random-float absolute top-0 right-[25%] z-10 h-[85%]  " />
            <HexagonOrangeDonut ref={hexagonOrangeDonutRef} className=" random-float absolute top-[15%] right-[5%] z-10 h-[25%]  " />
            <HexagonWhiteDonutBot ref={hexagonWhiteDonutBotRef} className=" random-float absolute -bottom-[10%] right-[26%] z-10 h-[25%] " />
            <HexagonWhiteDonutTop ref={hexagonWhiteDonutTopRef} className=" random-float absolute -top-[8%] left-[10%] z-10 h-[25%]  " />
            <HexagonOrangeBorder ref={hexagonOrangeBorderRef} className=" random-float absolute top-[20%] -left-[20%] z-10 h-[55%]  " />
            <DotHexagon ref={dotHexagonRef} className=" random-float absolute top-[20%] -right-[13%] z-10 h-[50%] " />
            <div className="flex-col-cen absolute top-0 left-1/2 z-20 h-full w-[60%] -translate-x-1/2 text-white ">
                <div className="text-[300%] font-bold tracking-wide lg:text-[400%]">คอมมูนิตี้</div>
                <div className="my-6 h-[3px] w-[85%] bg-white"></div>
                <div className="text-center text-[110%] tracking-wide lg:text-[180%]">
                    ที่จะรวบรวมข้อมูลข่าวสารภายในวิชาของคุณได้อย่างครบถ้วน และมีระบบตารางเรียนและเช็คชื่อได้ง่ายๆภายในคอมมูนิตี้
                </div>
                <div className="mt-20 cursor-pointer text-[120%] tracking-wide text-secondary underline lg:text-[150%]">เข้าสู่คอมมูนิตี้</div>
            </div>
        </div>
    );
};

export default CommunitySuggest;
