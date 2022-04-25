import { useEffect, useState } from "react";
import { POSTS } from "../../generalConfig";

export default function usePostSuggestApi() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postSuggest, setPostSuggest] = useState([]);

    useEffect(() => {
        let isSubscribe = true;
        const getData = async () => {
            setIsLoading(true);
            try {
                const data = await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(POSTS);
                    }, 2000);
                });
                if (isSubscribe) {
                    setIsLoading(false);
                    setPostSuggest(data);
                }
            } catch (error) {
                if (isSubscribe) {
                    setError(error);
                }
            }
        };
        getData();
        return () => {
            isSubscribe = false;
        };
    }, []);

    return { isLoading, error, postSuggest };
}
