import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const addCommunityPost = ({ commuID, body }) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/community/${commuID}/post/create`,
        {
            description: body,
        },
        { headers: { Authorization: `Bearer ${jwt}` } }
    );
};
export const useAddCommunityPost = success => {
    const queryClient = useQueryClient();
    return useMutation(addCommunityPost, {
        onSuccess: data => {
            console.log("newQueryData: ", data.data);
            queryClient.invalidateQueries("community");
            success();
        },
    });
};

const addCommunityComment = ({ commuID, postID, body }) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/community/${commuID}/post/${postID}/comment`,
        {
            comment: body,
        },
        { headers: { Authorization: `Bearer ${jwt}` } }
    );
};

export const useAddCommunityComment = () => {
    const queryClient = useQueryClient();

    return useMutation(addCommunityComment, {
        onSuccess: data => {
            queryClient.invalidateQueries("community");
            console.log(data);
        },
    });
};
