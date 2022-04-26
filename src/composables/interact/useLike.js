import axios from "axios";
import { useMutation, useQuery } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const like = (postID) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/recruit_post/${postID}/like`,{}, { headers: { Authorization: `Bearer ${jwt}` } });
};

export const useLike = () => {
    return useMutation(like);
};
