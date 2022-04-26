import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const Like = () => {
    return (
        <div className="flex-con-row absolute -right-[15px] bottom-[120px] w-20 2md:bottom-[250px] lg:bottom-[300px]">
            <FontAwesomeIcon icon={faStar} className="cursor-pointer lg:text-3xl text-xl text-amber-400"/>
            <div className="text-text ">12</div>
        </div>
    );
};

export default Like;
