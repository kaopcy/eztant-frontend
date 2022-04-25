import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Like from './Like';

const ProfileCard = (props) => {
const { data } = props;
return (
<div className="relative flex-con-row border-line border-solid border-2 w-[360px] h-[120px] rounded-md mt-[50px] 2md:self-start 2md:flex-con-col 2md:h-[250px] lg:h-[300px]">
    <img
        className="w-[70px] h-[70px] rounded-full shrink-0 2md:w-[110px] 2md:h-[110px] object-cover"
        src={data.pic}
        alt="profile"
    ></img>
    <div className="mr-10 ml-3 2md:flex-con-col 2md:mr-0 2md:mt-6">
    <div className="text-base text-text font-bold lg:text-xl">
        {data.name} ({data.stdID})
    </div>
    <div className="text-sm text-text font-medium lg:text-lg">{data.department}</div>
    <div className="text-sm text-secondary underline mt-4 font-medium lg:text-lg">
        {data.email}
    </div>
    </div>
    <div className="absolute flex-con-col w-[40px] bottom-5 right-5 2md:top-0 2md:mb-3 2md:mr-24 lg:w-[45px]">
    <FontAwesomeIcon icon={faStar} className="cursor-pointer lg:text-4xl text-2xl text-amber-400"/>
    <div className="absolute text-text mt-1 font-medium lg:text-lg">{data.like}</div>
    </div>
    <Like/>
</div>
);
};
export default ProfileCard;