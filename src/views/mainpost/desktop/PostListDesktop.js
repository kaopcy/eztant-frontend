import React from "react";

import Post from "./components/Post";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";

import { POSTS as posts } from "../../../generalConfig";

const PostListDesktop = () => {
    return (
        <div className="flex justify-center w-full px-10 space-x-4 items-start">
            <LeftSideBar />
            <div className="flex-col-cen space-y-4  text-text">
                {posts.map(post => (
                    <Post post={post} key={post.subjectID} />
                    ))}
            </div>
            <RightSideBar />
        </div>
    );
};

export default PostListDesktop;
