import React, { createContext, useCallback, useContext, useState } from "react";

export const TableInputContext = createContext([]);
const SetTableInputContext = createContext(() => {});
const AddTableInputContext = createContext(() => {});
const DeleteTableInputContext = createContext(() => {});

const initialObject = {
    section: "",
    time_from: "",
    time_to: "",
    day: "monday",
    max_ta: 1,
};

const initialState = [initialObject];

export const TableInputProvider = ({ children }) => {
    const [tableInput, setTableInput] = useState(initialState);
    const handleTableInput = useCallback((e, changeIndex) => {
        const { value, name } = e.target;
        setTableInput(old => {
            let newValue;
            switch (name) {
                case "time_from": {
                    const regex = /^(0(?:[1-9]|$)|1(?:[0-2]|$))(?:(:)(?:([0-5])(?:([0-9])(?:(\s)([ap]m?)?)?)?)?)?$/;
                    const temp = value
                        .replaceAll(":", "")
                        .replace(/[^0-9]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .replace(/(..?)/g, "$1:")
                        .slice(0, -1);

                    newValue = temp.length <= 6 ? temp : old[changeIndex][name];
                    break;
                }
                case "time_to": {
                    const regex = /^(0(?:[1-9]|$)|1(?:[0-2]|$))(?:(:)(?:([0-5])(?:([0-9])(?:(\s)([ap]m?)?)?)?)?)?$/;
                    const temp = value
                        .replaceAll(":", "")
                        .replace(/[^0-9]/g, "")
                        .replace(/(\..*)\./g, "$1")
                        .replace(/(..?)/g, "$1:")
                        .slice(0, -1);

                    newValue = temp.length <= 6 ? temp : old[changeIndex][name];
                    break;
                }

                default:
                    newValue = value;
                    break;
            }
            return changeIndex >= old.length
                ? [...old, { ...initialObject, [name]: newValue }]
                : old.map((e, index) => {
                      return index === changeIndex ? { ...e, [name]: newValue } : e;
                  });
        });
    }, []);

    const addTableInput = useCallback(() => {
        setTableInput(old => [...old, initialObject]);
    }, []);

    const deleteTableInput = useCallback((index, callback) => {
        setTableInput(old => {
            if (old.length > 1) callback();
            return old.length > 1 ? old.filter((_, i) => i !== index) : old;
        });
    }, []);

    return (
        <TableInputContext.Provider value={tableInput}>
            <AddTableInputContext.Provider value={addTableInput}>
                <DeleteTableInputContext.Provider value={deleteTableInput}>
                    <SetTableInputContext.Provider value={handleTableInput}>{children}</SetTableInputContext.Provider>
                </DeleteTableInputContext.Provider>
            </AddTableInputContext.Provider>
        </TableInputContext.Provider>
    );
};

export const useHandleTableInput = () => useContext(SetTableInputContext);
export const useTableInput = () => useContext(TableInputContext);
export const useAddTableInput = () => useContext(AddTableInputContext);
export const useDeleteTableInput = () => useContext(DeleteTableInputContext);
