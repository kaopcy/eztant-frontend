import React, { createContext, useContext, useState } from "react";

const TableInputContext = createContext([]);
const SetTableInputContext = createContext(() => {});

export const TableInputProvider = ({ children }) => {
    const [tableInput, setTableInput] = useState(null);

    return (
        <TableInputContext.Provider value={tableInput}>
            <SetTableInputContext.Provider value={setTableInput}>{children}</SetTableInputContext.Provider>
        </TableInputContext.Provider>
    );
};

export const useSetTableInput = () => useContext(SetTableInputContext);
export const useTableInput = () => useContext(TableInputContext);
