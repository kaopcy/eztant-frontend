import React, { createContext, useEffect, useState, useContext } from "react";
import SearchIcon from "../../../../component/utils/SearchIcon";

const SortContext = createContext({ sortBy: "teacherName", setSortBy: () => {}, orderBy: "", setOrderBy: () => {} });

const RightSideBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [sortBy, setSortBy] = useState("teacherName");
    const [orderBy, setOrderBy] = useState("ascending");

    useEffect(() => {
        console.log(sortBy);
    }, [sortBy]);
    return (
        <SortContext.Provider value={{ sortBy, setSortBy, orderBy, setOrderBy }}>
            <div className="w-[230px] bg-[#f5f5f5] px-3 py-8 text-lg text-text shadow-md sticky top-[80px]">
                <div className="flex flex-col space-y-4">
                    <SearchBar setSearchValue={setSearchValue} />
                    <div className="font-bold">จัดเรียง</div>
                    <div className="flex flex-col space-y-4">
                        <SortCheckBox label="ตามชื่อผู้สอน" value="teacherName" />
                        <SortCheckBox label="ตามจำนวนเงิน" value="wage" />
                        <SortCheckBox label="ตามชื่อวิชา" value="subjectName" />
                        <SortCheckBox label="ตามรหัสวิชา" value="subjectID" />
                    </div>
                    <div className="font-bold">เรียงจาก</div>
                    <div className="flex flex-col space-y-4">
                        <OrderCheckBox label="น้อยไปมาก" value="ascending" />
                        <OrderCheckBox label="มากไปน้อย" value="descending" />
                    </div>
                </div>
            </div>
        </SortContext.Provider>
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
        <label className="flex cursor-pointer items-center space-x-2">
            <input
                checked={orderBy === value}
                type="radio"
                className=" form-radio border border-text-light text-secondary"
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

export default RightSideBar;
