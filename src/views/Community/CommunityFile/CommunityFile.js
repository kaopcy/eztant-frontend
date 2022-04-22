import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useMemo } from "react";
import { CommunityContext } from "../CommunityContext";

const CommunityFile = () => {
    const community = useContext(CommunityContext);
    const files = useMemo(() => {
        const allFile = [];
        community.posts.forEach(post => {
            if (post.file?.name) {
                allFile.push(post.file);
            }
        });
        return allFile;
    }, [community]);
    useEffect(() => {
        console.log("file: ");
        console.log(files);
    }, [files]);
    return (
        <div className="flex h-full w-full max-w-[920px] flex-col items-start bg-[#CBC5C5]  ">
            <div className="">ไฟล์</div>
            <div className="flex w-full flex-wrap justify-around justify-items-stretch">
                {files.map(file => (
                    <File key={file.created_at.getTime()} file={file} />
                ))}
            </div>
        </div>
    );
};

const File = ({ file, index }) => {
    return (
        <div className="flex w-[28%] items-center px-3 py-2 bg-white min-w-0">
            <div className="text-base tracking-tight text-text ellipsis w-full">{file.name}</div>
            <FontAwesomeIcon icon={faEllipsis} />
        </div>
    );
};

export default CommunityFile;
