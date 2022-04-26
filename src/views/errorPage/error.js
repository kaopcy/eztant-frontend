// import error from "../../assets/img/error.jpg";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex-con-col sm:flex-con-row absolute h-full w-full overflow-hidden">
            <div className="flex-con-col w-full xs:w-4/5">
                <img src={'https://raw.githubusercontent.com/PitchapaWiangthong/EZtantVer2/main/src/assets/img/error.jpg'} alt="404 error"></img>
            </div>
            <div className="flex-con-col w-[60%]">
                <div className="text-3xl 2md:text-4xl lg:text-5xl">เกิดข้อผิดพลาด</div>
                <div className="bg-zice-300 border-2 m-2 h-1 w-8/12 2md:m-4 lg:m-5"></div>
                <div className="text-lg 2md:text-2xl lg:text-3xl">ไม่พบหน้าที่คุณต้องการค้นหา</div>
                <Link
                    className="flex-con-col text-white hover:bg-line mt-5 h-9 w-28 rounded-md border-none bg-[#007cff] text-sm 
                    duration-75 hover:border-2 hover:bg-zinc-300 hover:border-[#007cff] hover:text-[#007cff] 
                    2md:mt-12 2md:h-11 2md:w-32 2md:text-lg
                    lg:h-14 lg:w-40 lg:text-2xl"
                    to="/">
                    ย้อนกลับ
                </Link>
            </div>
        </div>
    );
};

export default Error;
