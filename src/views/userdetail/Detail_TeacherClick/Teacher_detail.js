import CommentCard from "./component/Comment-card";
import HistoryWorked from "./component/History-worked";
import ProfileCard from "./component/Profile-card";
import { v4 as uuidv4 } from "uuid";

const Teacher_detail = () => {
    const profile_data = {
        pic: "https://scontent.fbkk5-1.fna.fbcdn.net/v/t39.30808-6/267999607_3085449421781638_3480703431662571325_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zF8tzwHVcskAX8_p8CL&_nc_ht=scontent.fbkk5-1.fna&oh=00_AT-dG1GWd-cqjAGuuG89liODsnuaoVMtQeN0gG1AdHfV8g&oe=626AD6D9",
        name: "พรหมพิริยะ เจริญพานทองดี",
        stdID: "63010648",
        department: "โทรคมนาคม",
        email: "phompirirya.ja@kmitl.ac.th",
        tel: "083-234-5543",
        like: 34,
    };
    const worked_data = ["DATA COMMUNICATION", "DIGITAL", "ENGLISH", "WEDSITE"];
    const comment_data = [
        {
            pic: "https://www.mckinsey.com/~/media/mckinsey/careers%20redesign/meet%20our%20people/profiles/yetunde/yetunde_1132x1224.jpg?mw=1536&car=48:59&cpx=Left&cpy=Top",
            name: "พิชชาภา เวียงทอง",
            comment: "สอนไม่ดีเลยค่ะ",
        },
        {
            pic: "https://media.istockphoto.com/photos/portrait-of-a-successful-malay-muslim-man-picture-id1148380353?k=20&m=1148380353&s=612x612&w=0&h=svhVFjShpRc16s2_Nh5WpdkNFuU321jY2LiSBZYllAY=",
            name: "โอเคนะคะ นะคะเจอกันซักแปปนึง",
            comment: "แต่ใจดี มีน้ำใจ",
        },
        {
            pic: "https://media.istockphoto.com/photos/portrait-of-handsome-latino-african-man-picture-id1007763808?k=20&m=1007763808&s=612x612&w=0&h=q4qlV-99EK1VHePL1-Xon4gpdpK7kz3631XK4Hgr1ls=",
            name: "พัชราภา ไชยเชื้อ",
            comment: "คนสอนนิสัยก็โอเคดีค่ะ",
        },
    ];

    return (
        <>
            <div className="bg-line h-[80px] w-full"></div>
            <div className="flex-row 2md:flex">
                <div className="flex-con-col w-full 2md:w-1/2">
                    <div>
                        <ProfileCard data={profile_data} />
                    </div>
                    <div className="mt-6 lg:mb-7">
                        <HistoryWorked data={worked_data} key={uuidv4()} />
                    </div>
                </div>

                <div className="flex justify-center 2md:w-1/2 lg:w-[60%]">
                    <div className=" my-5 w-[360px] items-start 2md:w-full">
                        <div className="bg-line my-3 h-0.5 w-full 2md:my-0 2md:h-0 2md:w-0"></div>
                        <div className="left-0 my-3 text-xl font-bold text-text">คอมเมนท์ ({comment_data.length})</div>
                        {comment_data.map(items => (
                            <CommentCard data={items} key={uuidv4()} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Teacher_detail;
