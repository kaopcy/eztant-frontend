import { useState, useEffect } from "react";
import { POSTS } from "../../generalConfig";

import useSearchQuery from "../../composables/useSearchQuery";

export const usePostList = (page, id) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postList, setPostList] = useState([]);

    const { allQuery } = useSearchQuery();

    useEffect(() => {
        let isSubscribe = true;
        const getPostList = async () => {
            try {
                const postQuery = {
                    page: allQuery?.page || "1",
                    search: allQuery?.search || "",
                    sortBy: allQuery?.sortBy || "teacherName",
                    orderBy: allQuery?.orderBy || "ascending",
                };

                console.log(postQuery);
                setIsLoading(true);
                const data = await new Promise((resolve, reject) => {
                    const uuidv4 = () => {
                        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
                        );
                    };
                    setTimeout(() => {
                        resolve(POSTS.map(e => ({ ...e, subjectID: uuidv4(), page: allQuery?.page || 1 })));
                    }, 500);
                });
                if (isSubscribe) {
                    setIsLoading(false);
                    setPostList(prev => [...prev, ...data]);
                }
            } catch (error) {
                setError(error);
            }
        };
        getPostList();

        return () => {
            isSubscribe = false;
        };
    }, [id, allQuery]);

    const clearPostList = () => {
        setPostList([]);
    };

    return { isLoading, error, postList, clearPostList };
};
