import axios from "axios";
import { useQuery } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const toggleNotification = postID => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/notification/get`, { headers: { Authorization: `Bearer ${jwt}` } });
};

export const useNotification = () => {
    return useQuery("noti", toggleNotification);
};
