import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const fetchAttendentByDay = ({ commuID, date }) => {
    const roundDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const query = {
        attend_date: roundDate,
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/api/community/${commuID}/attendance/get`, query, {
        headers: { Authorization: `Bearer ${jwt}` },
    });
};
export const useFetchAttendentByDay = () => {
    return useMutation("ownerPost", fetchAttendentByDay, {});
};
