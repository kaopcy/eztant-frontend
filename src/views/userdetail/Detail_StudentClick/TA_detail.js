import ProfileCard from "./component/Profile-card";
import CommentInput from "./component/Comment-input";
import CommentCard from "./component/Comment-card";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TA_detail = () => {
    const initdata = {
        pic: "https://scontent.fbkk5-6.fna.fbcdn.net/v/t31.18172-8/12339081_10203830842209825_2022223518266037990_o.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=Pt4-D8RPP-YAX8KOOyB&tn=N8A3TzvFbg1a5Aq2&_nc_ht=scontent.fbkk5-6.fna&oh=00_AT9B5k2bPFeVrt7JjKvyJ17FnjdxJy7Lo5JEb2aggz-BmA&oe=626F5202",
        name: "ปิยชัย แก้วชุ่ม",
        stdID: "63010604",
        department: "โทรคมนาคม",
        email: "piyachai.k@kmitl.ac.th",
        like: "12",
    };
    const user = {
        pic: "https://scontent.fcnx1-1.fna.fbcdn.net/v/t31.18172-8/12366022_1529187037393272_8365755350343761851_o.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeHwzehnGX6T1s6AlOy7SZf3Xm4l72L8x5tebiXvYvzHm9Rx8U7G_VOYwA2KbO0Gs2Z559uvj-ko_00jPhoVRDXX&_nc_ohc=5dPLWofyc8EAX8qjnyn&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT96XsynPvM5ggO-MRGuJLStQlsYG83AWCG2IAenFaPf8g&oe=628A293C",
        name: "พิชชาภา เวียงทอง",
    };
    const [item, setItem] = useState([]);
    const onAddNewItem = newItem => {
        setItem(e => [...e, newItem]);
        console.log(item);
    };
    return (
        <>
            <div className="bg-line h-[80px] w-full"></div>
            <div className="flex-con-col 2md:flex-con-row w-full">
                <ProfileCard data={initdata} />
                <div className="mb-20 2md:ml-10 2md:flex 2md:flex-col lg:ml-20 xl:ml-40">
                    <CommentInput data={initdata} onAddItem={onAddNewItem} />
                    <div className="flex w-[360px] flex-col items-start lg:w-[400px] xl:w-[500px]">
                        <div className="left-0 text-xl font-bold text-text">คอมเมนท์ของคุณ ({item.length})</div>
                        <div className="bg-line my-3 h-0.5 w-full"></div>
                        {item.map(comment => (
                            <CommentCard data_user={user} data_comment={comment} key={uuidv4()} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TA_detail;
