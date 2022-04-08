import React, { useContext } from "react";
import useSearchQuery from "../../../../composables/useSearchQuery";

import SearchIcon from "../../../../component/utils/SearchIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { SortContext, SearchContext } from "../../context/ControlContext";
import { SORT_TYPE, ORDER_TYPE } from "../../../../generalConfig";

const SortPanel = ({ setPage }) => {
    const { setSearchValue, searchValue } = useContext(SearchContext);
    const { orderBy, sortBy } = useContext(SortContext);
    const { appendQuery } = useSearchQuery();

    const handleOnSort = () => {
        setPage(()=>{
            appendQuery({ search: searchValue, orderBy, sortBy });
        })
    };

    return (
        <div className="sticky top-[80px] w-[230px] bg-[#f2f2f2] px-3 py-8 text-lg text-text shadow-md">
            <div className="flex flex-col">
                <SearchBar setSearchValue={setSearchValue} />
                <div className="mt-4 font-bold">จัดเรียง</div>
                <div className="flex flex-col space-y-4">
                    {SORT_TYPE.map(e => (
                        <SortCheckBox key={e.label} label={e.label} value={e.value} />
                    ))}
                </div>
                <div className="mt-4 font-bold">เรียงจาก</div>
                <div className="flex flex-col space-y-4">
                    {ORDER_TYPE.map(e => (
                        <OrderCheckBox key={e.label} label={e.label} value={e.value} />
                    ))}
                </div>
                <div className="btn-orange mt-6 flex items-center space-x-3 self-end rounded-md py-1 px-3" onClick={() => handleOnSort()}>
                    <span className="">ค้นหา</span>
                    <FontAwesomeIcon icon={faSearch} className="text-sm " />
                </div>
            </div>
        </div>
    );
};

const SortCheckBox = ({ label, value }) => {
    const { setSortBy, sortBy } = useContext(SortContext);
    return (
        <label className="flex cursor-pointer items-center space-x-2">
            <input
                checked={sortBy === value}
                type="radio"
                className=" form-radio border border-text-light text-secondary"
                value={value}
                onChange={e => setSortBy(e.target.value)}
            />
            <span className="">{label}</span>
        </label>
    );
};

const OrderCheckBox = ({ label, value }) => {
    const { setOrderBy, orderBy } = useContext(SortContext);
    return (
        <label className="flex cursor-pointer items-center space-x-2 ">
            <input
                checked={orderBy === value}
                type="radio"
                className=" form-radio border border-text-light text-secondary "
                value={value}
                onChange={e => setOrderBy(e.target.value)}
            />
            <span className="">{label}</span>
        </label>
    );
};

const SearchBar = ({ setSearchValue }) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                className="form-input w-full rounded-md border px-2 py-1 text-base shadow-sm focus:border-text "
                onChange={e => setSearchValue(e.target.value)}
            />
            <SearchIcon color="#CBC5C5" className="h-8 w-8" />
        </div>
    );
};

export default SortPanel;
