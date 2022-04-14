import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchQuery = () => {
    const [query, setQuery] = useSearchParams();

    const allQuery = useMemo(() => {
        let temp;
        query.forEach((value, key) => {
            temp = { ...temp, [key]: value };
        });
        return temp;
    }, [query]);

    const searchAsObject = Object.fromEntries(new URLSearchParams(query));

    const appendQuery = newQuery => {
        setQuery({ ...allQuery, ...newQuery });
    };

    return { allQuery, appendQuery, query:searchAsObject };
};

export default useSearchQuery;
