import React, { useEffect, useState } from "react";

import RequestSubjectList from "./components/RequestSubjectList";
import AcceptedList from "./components/AcceptedList";
import MainRequest from "./components/MainRequest";

import { useUserPost } from "../RequestListContext";
import { useMediaQuery } from "react-responsive";

const RequestListDesktop = () => {
    const posts = useUserPost();
    const [activeSubject, setActiveSubject] = useState(posts.length ? 0 : null);
    const [activeSection, setActiveSection] = useState(posts.length ? 0 : null);
    const isHideSortPanel = useMediaQuery({ query: "(max-width: 1180px)" });

    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return (
        <div className="relative flex min-h-[2000px] w-full  justify-center bg-[#f5f5f5]">
            <RequestSubjectList activeSection={activeSection} posts={posts} active={activeSubject} setActive={setActiveSubject} />
            <MainRequest post={posts[activeSubject]} postNum={activeSubject} setActiveSection={setActiveSection} />
            {!isHideSortPanel && (
                <AcceptedList
                    activeSubject={activeSubject}
                    post={posts[activeSubject]}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            )}
        </div>
    );
};

export default RequestListDesktop;
