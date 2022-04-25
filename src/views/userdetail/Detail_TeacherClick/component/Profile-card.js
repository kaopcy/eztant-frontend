import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Like from "./Like";

const ProfileCard = props => {
    const { data } = props;
    return (
        <>
            <div className="flex-con-row border-line 2md:flex-con-col relative mt-[50px] h-[120px] w-[360px] rounded-md border-2 border-solid 2md:h-[250px] 2md:self-start lg:h-[300px]">
                <img className="m-3 h-[70px] w-[70px] shrink-0 rounded-full 2md:h-[110px] 2md:w-[110px] object-cover" src={data.pic} alt="profile"></img>
                <div className="2md:flex-con-col mr-10 ml-3 justify-center 2md:mr-0 2md:mt-6 2md:ml-0">
                    <div className="text-base font-bold text-text lg:text-lg">
                        {data.name} ({data.stdID})
                    </div>
                    <div className="text-sm font-medium text-text lg:text-lg">{data.department}</div>
                    <div className="mt-4 text-sm font-medium text-secondary underline lg:text-lg">{data.email}</div>
                </div>
                <div className="flex-con-col absolute bottom-5 right-5 w-[40px] 2md:top-0 2md:mb-3 2md:mr-24 lg:w-[45px]">
                    <FontAwesomeIcon icon={faStar} className="cursor-pointer lg:text-4xl text-3xl text-amber-400"/>
                    <div className="absolute mt-1 font-medium text-text lg:text-lg">{data.like}</div>
                </div>
                <Like />
            </div>
            <div className="flex-con-row border-line h-[40px] w-[360px] rounded-b-md border-x-2 border-b-2 border-solid">
                <div className="text-white flex-con-col  h-[40px] w-1/2 rounded-b-md bg-primary">เบอร์โทรศัพท์</div>
                <div className="flex-con-col w-1/2 text-primary">{data.tel}</div>
            </div>
        </>
    );
};
export default ProfileCard;
