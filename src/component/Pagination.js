import React, { useEffect, useMemo } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ setPage, totalPage = 10 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get("page") || 1;
    useEffect(() => {
        console.log(`effect`);
    }, []);
    let startPage = currentPage - 3;
    let endPage = currentPage + 3;

    if (startPage <= 0) {
        endPage -= startPage - 1;
        startPage = 1;
    }
    if (endPage > totalPage) endPage = totalPage;

    const numbers = [...Array.from(Array(endPage - startPage + 1)).keys()].map(i => i + startPage);

    const canNext = useMemo(() => {
        return currentPage < totalPage;
    }, [currentPage, totalPage]);

    const canPrevious = useMemo(() => {
        return currentPage > 1;
    }, [currentPage]);

    return (
        <div className=" flex items-center space-x-3 text-sm font-bold text-text">
            <Chevron canNext={canNext} canPrevious={canPrevious} reverse setPage={setPage} totalPage={totalPage} />
            <div
                disabled={!canPrevious}
                className="btn-orange cursor-pointer rounded-md !border-none !bg-transparent p-2 hover:bg-slate-100"
                onClick={() => canPrevious && setPage(e => (e > 1 ? e - 1 : e))}>
                PREV
            </div>
            <div className="flex items-center space-x-1 ">
                {numbers.map(number => (
                    <Number setPage={setPage} number={number} active={number === parseInt(currentPage)} key={number} />
                ))}
            </div>
            <button
                disabled={!canNext}
                className="btn-orange cursor-pointer rounded-md !border-none !bg-transparent p-2 hover:bg-slate-100"
                onClick={() => canNext && setPage(e => (e < totalPage ? e + 1 : e))}>
                NEXT
            </button>
            <Chevron setPage={setPage} totalPage={totalPage} canNext={canNext} canPrevious={canPrevious} />
        </div>
    );
};

const Chevron = ({ reverse, setPage, totalPage, canNext, canPrevious }) => {
    const onClick = () => {
        if (!reverse) {
            if (canNext) setPage(reverse ? 1 : totalPage);
        } else {
            if (canPrevious) setPage(reverse ? 1 : totalPage);
        }
    };
    return reverse ? (
        <button
            disabled={!canPrevious}
            onClick={() => onClick()}
            className={`btn-orange !border-none !bg-transparent flex-cen h-8 w-8 cursor-pointer -space-x-1 rounded-md hover:bg-slate-100 ${reverse && "rotate-180"}`}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    ) : (
        <button
            disabled={!canNext}
            onClick={() => onClick()}
            className={`btn-orange !border-none !bg-transparent flex-cen h-8 w-8 cursor-pointer -space-x-1 rounded-md hover:bg-slate-100 ${reverse && "rotate-180"}`}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
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
