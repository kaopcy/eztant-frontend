import React, { useContext } from "react";
import PostSearch from "./PostSearch";
import Carousel from "./Carousel";
import CarouselMobile from "./CarouselMobile";
import { useResponsive } from "../../../../composables/context/useResponsive";

const Post = () => {
    const isMobile = useResponsive();
    return (
        <div className="w-full">
            <PostSearch />
            {!isMobile && <Carousel />}
            {isMobile && <CarouselMobile />}
        </div>
    );
};

export default Post;
