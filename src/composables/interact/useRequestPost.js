import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem('jwt'))
const requestPost = (scheduleID)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/api/recruit_post/schedule/${scheduleID}/request`, {} , { headers: { Authorization: `Bearer ${jwt}` } } )
}

export const useRequestPost = (onSuccess)=>{
    return useMutation(requestPost , { onSuccess })
}