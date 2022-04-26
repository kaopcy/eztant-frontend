import { useMutation } from "react-query";
import axios from "axios";

import { castPost } from "../../utils/castDataName";

const jwt = JSON.parse(localStorage.getItem("jwt"));

const createPost = postInput => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/recruit_post/create`, castPost(postInput), {
        headers: { Authorization: `Bearer ${jwt}` },
    });
};

export default function useCreatePost() {
    return useMutation(createPost);
}
