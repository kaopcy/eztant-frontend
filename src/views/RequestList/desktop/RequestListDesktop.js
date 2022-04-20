import React, { useEffect, useState } from "react";

import RequestSubjectList from "./components/RequestSubjectList";
import AcceptedList from "./components/AcceptedList";
import MainRequest from "./components/MainRequest";

import { REQUEST_LIST } from "../../../generalConfig";

const RequestListDesktop = () => {
    const posts = REQUEST_LIST;
    const [activeSubject, setActiveSubject] = useState(posts.length ? 0 : null);
    const [activeSection, setActiveSection] = useState(posts.length ? 0 : null);

    useEffect(() => {
        setActiveSection(0);
    }, [activeSubject]);

    return (
        <div className="relative flex min-h-[2000px] w-full justify-center">
            <RequestSubjectList activeSection={activeSection} posts={posts} active={activeSubject} setActive={setActiveSubject} />
            <MainRequest post={posts[activeSubject]} setActiveSection={setActiveSection} />
            <AcceptedList
                activeSubject={activeSubject}
                post={posts[activeSubject]}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
        </div>
    );
};

export default RequestListDesktop;
