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
        <div className="flex h-[calc(100vh-120px)] w-full max-w-[920px]  flex-col items-start rounded-md  bg-[#CBC5C5] py-10 text-text  shadow-md">
            <div className="w-full px-14">
                <div className="w-[28%] text-2xl font-bold  ">ไฟล์</div>
                <div className="flex w-full flex-wrap  justify-start ">
                    {files.length > 0 ? (
                        files.map(file => <File key={file.created_at.getTime()} file={file} />)
                    ) : (
                        <div className="mt-10 ml-4 w-full ">ไม่มีไฟล์</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const File = ({ file, index }) => {
    return (
        <div className="my-2 mr-10 flex w-[28%] min-w-0 items-center rounded-md bg-white px-3 py-2">
            <div className="ellipsis w-full text-base tracking-tight text-text">{file.name}</div>
            <FontAwesomeIcon icon={faEllipsis} />
        </div>
    );
};

export default CommunityFile;
