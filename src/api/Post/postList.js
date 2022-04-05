import { useState, useEffect } from "react";
import { POSTS } from "../../generalConfig";
export const usePostList = (page, id ) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        clearPostList();
    }, [id , page]);

    useEffect(() => {
        getPostList();
    }, [page, id]);

    useEffect(() => {
        console.log(`trigger isLoading: ${isLoading}`);
    }, [isLoading]);

    const clearPostList = () => {
        setPostList([]);
    };

    const getPostList = async () => {
        try {
            setIsLoading(true);
            const data = await new Promise((resolve, reject) => {
                const uuidv4 =()=> {
                    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
                    );
                }
                setTimeout(() => {
                    resolve(POSTS.map(e=> ({ ...e , subjectID: uuidv4() })));
                }, 500);
            });
            setIsLoading(false);
            setPostList(prev => [...prev, ...data]);
        } catch (error) {
            setError(error);
        }
    };

    

    return { isLoading, error, postList, getPostList, clearPostList };
};
