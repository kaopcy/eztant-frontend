import React from "react";

import Post from "./components/Post";
import DepartmentPanel from "./components/DepartmentPanel";
import SortPanel from "./components/SortPanel";
import { useMediaQuery } from "react-responsive";

import { POSTS as posts } from "../../../generalConfig";

const PostListDesktop = () => {
    const isHideSortPanel = useMediaQuery({ query: "(max-width: 1180px)" });
    const isDepartmentPanel = useMediaQuery({ query: "(max-width: 980px)" });

    return (
        <div className="flex w-full items-start overflow-hidden lg:overflow-visible justify-center space-x-4 ">
            {!isDepartmentPanel && <DepartmentPanel />}
            <div className="flex-col-cen space-y-4 text-text">
                {posts.map(post => (
                    <Post post={post} key={post.subjectID} />
                ))}
            </div>
            {!isHideSortPanel && <SortPanel />}
        </div>
    );
};

export default PostListDesktop;
