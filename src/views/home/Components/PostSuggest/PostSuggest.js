import React, { useContext } from "react";
import PostSearch from "./PostSearch";
import SwiperCarousel from "./SwiperCarousel";
import CarouselMobile from "./CarouselMobile";
import { useResponsive } from "../../../../composables/context/useResponsive";

const PostSuggest = () => {
    const isMobile = useResponsive();
    return (
        <div className="w-full flex-col-cen">
            <PostSearch />
            {!isMobile && <SwiperCarousel />}
            {isMobile && <CarouselMobile />}
        </div>
    );
};

export default PostSuggest;
