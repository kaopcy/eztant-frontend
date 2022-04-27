import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const AcceptRequest = (scheduleID , userID) => {
    return axios.post(`${process.env.REACT_APP_API_URL}api/recruit_post/schedule/${scheduleID}/accept/${userID}`,{}, { headers: { Authorization: `Bearer ${jwt}` } });
};

export const useAcceptRequest = () => {
    return useMutation(AcceptRequest);
};
