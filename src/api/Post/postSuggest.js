import { useEffect, useState } from "react";
import { POSTS } from "../../generalConfig";

export const usePostSuggestApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postSuggest, setPostSuggest] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const data = await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(POSTS);
                    }, 2000);
                });
                setIsLoading(false)
                setPostSuggest(data)
            } catch (error) {
                setError(error)
            }
        };
        getData();
    },[]);

    return { isLoading , error , postSuggest }
};
