import axios from "axios";
import { useMutation } from "react-query";

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