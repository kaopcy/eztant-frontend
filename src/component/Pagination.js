import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ Page, currentPage = 20, setPage, totalPage = 2}) => {
    let startPage = currentPage - 3;
    let endPage = currentPage + 3;
    // const index = [1,2,3,4,5,6,7]

    if (startPage <= 0) {
        endPage -= startPage - 1;
        startPage = 1;
    }
    if (endPage > totalPage) endPage = totalPage;

    console.log(`start: ${startPage}, end: ${endPage}`);
    const numbers = [...Array.from(Array(endPage - startPage + 1)).keys()].map(i => i + startPage);

    return (
        <div className=" flex items-center space-x-3 text-sm font-bold text-text">
            <Chevron reverse setPage={setPage} />
            <div className="cursor-pointer rounded-md p-2 hover:bg-slate-100" onClick={() => setPage(e => (e > 1 ? e - 1 : e))}>
                PREV
            </div>
            <div className="flex items-center space-x-1 ">
                {numbers.map(number => (
                    <Number setPage={setPage} number={number} active={currentPage === number} key={number} />
                ))}
            </div>
            <div className="cursor-pointer rounded-md p-2 hover:bg-slate-100" onClick={() => setPage(e => (e < totalPage ? e + 1 : e))}>
                NEXT
            </div>
            <Chevron setPage={setPage} />
        </div>
    );
};

const Chevron = ({ reverse, setPage }) => {
    return (
        <div
            onClick={() => setPage(e => (reverse ? e - 1 : e + 1))}
            className={`flex-cen h-8 w-8 cursor-pointer -space-x-1 rounded-md hover:bg-slate-100 ${reverse && "rotate-180"}`}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
};

const Number = ({ number, active, setPage }) => {
    return (
        <div
            onClick={() => setPage(number)}
            className={`flex-col-cen  h-8 w-8 cursor-pointer rounded-md  ${active ? "bg-secondary text-white" : "hover:bg-slate-100"}`}>
            {number}
        </div>
    );
};

export default Pagination;
