import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const AcceptRequest = ({ scheduleID, userID }) => {
    console.log(scheduleID, userID);
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/recruit_post/schedule/${scheduleID}/accept/${userID}`,
        {},
        { headers: { Authorization: `Bearer ${jwt}` } }
    );
};

export const useAcceptRequest = onSuccess => {
    const queryClient = useQueryClient();
    const old = queryClient.getQueryData("PostAcceptList");
    console.log(old);
    return useMutation(AcceptRequest, {
        onSuccess,
    });
};
