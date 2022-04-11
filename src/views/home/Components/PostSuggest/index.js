import React, { useContext } from "react";
import PostSearch from "./PostSearch";
import PostSuggestDesktop from "./PostSuggestDesktop";
import PostSuggestMobile from "./PostSuggestMobile";
import { useResponsive } from "../../../../composables/context/useResponsive";
import usePostSuggestApi from "../../../../api/Post/usePostSuggestFetch";

const PostSuggest = () => {
    const isMobile = useResponsive();
    const { isLoading, postSuggest } = usePostSuggestApi();
    return (
        <div className="flex-col-cen w-full">
            <PostSearch />
            {!isMobile && <PostSuggestDesktop isLoading={isLoading} postSuggest={postSuggest} />}
            {isMobile && <PostSuggestMobile isLoading={isLoading} postSuggest={postSuggest} />}
        </div>
    );
};

export default PostSuggest;
