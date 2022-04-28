import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const uploadAttendance = ({ commuID, attend_date }) => {
    const roundDate = new Date(attend_date.getFullYear(), attend_date.getMonth(), attend_date.getDate());
    console.log(commuID);
    const query = {
        attend_date: roundDate,
        evidence_url: "kuay i sas .com",
    };

    return axios.post(`${process.env.REACT_APP_API_URL}/api/community/${commuID}/attendance/create`, query, {
        headers: { Authorization: `Bearer ${jwt}` },
    });
};

export const useUploadAttendance = onSuccess => {
    return useMutation(uploadAttendance, {
        onSuccess,
    });
};

const checkedByTeacher = ({ commuID, attendID }) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/community/${commuID}/attendance/${attendID}/check_by_teacher`,
        {},
        {
            headers: { Authorization: `Bearer ${jwt}` },
        }
    );
};

export const useCheckedByTeacher = onSuccess => {
    return useMutation(checkedByTeacher, {
        onSuccess,
    });
};
