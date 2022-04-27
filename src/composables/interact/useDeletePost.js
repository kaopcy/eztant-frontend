import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem('jwt'))
const deletePostByID = (postID)=>{
    return axios.delete(`${process.env.REACT_APP_API_URL}/api/recruit_post/${postID}/delete` , { headers: { Authorization: `Bearer ${jwt}` } } )
}

export const useDeletePostByID = (onSuccess)=>{
    return useMutation(deletePostByID , { onSuccess })
}