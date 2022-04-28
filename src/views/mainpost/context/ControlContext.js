import React, { useEffect, createContext, useState } from "react";

export const SortContext = createContext({ sortBy: null, setSortBy: () => {}, orderBy: "", setOrderBy: () => {} });
export const SearchContext = createContext({ searchValue: null, setSearchValue: () => {} });

export const ControlProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [orderBy, setOrderBy] = useState("ascending");
    return (
        <SortContext.Provider value={{ sortBy, setSortBy, orderBy, setOrderBy }}>
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>
        </SortContext.Provider>
    );
};
