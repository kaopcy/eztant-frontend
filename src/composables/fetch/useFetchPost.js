import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { DEPARTMENT_MAP } from "../../generalConfig";
import { castPostFromDatabase } from "../../utils/castDataName";
import useSearchQuery from "../useSearchQuery";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const fetchPostByID = id => {
    const query = {
        filter: {
            _id: id,
        },
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/api/recruit_post/getposts`, query, { headers: { Authorization: `Bearer ${jwt}` } });
};
export const useFetchPostByID = () => {
    return useMutation("previewPost", fetchPostByID);
};

const fetchPostByOwnerID = id => {
    const query = {
        filter: {
            owner_id: {
                _id: id,
            },
        },
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/api/recruit_post/getposts`, query, { headers: { Authorization: `Bearer ${jwt}` } });
};
export const useFetchPostByOwnerID = () => {
    return useMutation("ownerPost", fetchPostByOwnerID, {});
};

export const usePostListFetch = id => {
    const { data, mutate, error, isLoading } = useFetchAllPost();
    const { allQuery } = useSearchQuery();
    useEffect(() => {
        const key = Object.keys(DEPARTMENT_MAP).map(e => e.toLowerCase().replace(/[^\w]/gi, ""));
        const index = key.indexOf(id.toLowerCase().replace(/[^\w\s]/gi, ""));
        const departmentValue = Object.values(DEPARTMENT_MAP);
        const postQuery = {
            filter:
                departmentValue[index] && departmentValue[index] === "รวมทุกภาควิชา"
                    ? {}
                    : {
                          department: departmentValue[index],
                      },

            page: allQuery?.page || "1",
            // search: allQuery?.search || "",
            // sortBy: allQuery?.sortBy || "teacherName",
            // orderBy: allQuery?.orderBy || "ascending",
        };
        mutate(postQuery);
    }, [id, allQuery, mutate]);

    return { isLoading, error, posts: data?.data?.posts?.map(e => castPostFromDatabase(e)) };
};

const fetchAllPost = query => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/recruit_post/getposts`, query, { headers: { Authorization: `Bearer ${jwt}` } });
};
const useFetchAllPost = () => {
    return useMutation(fetchAllPost);
};
