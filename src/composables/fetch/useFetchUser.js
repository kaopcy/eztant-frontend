import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const fetchUserByRole = (role) => {
    const query = {
        filter: {
            role,
        },
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/getusers`, query, { headers: { Authorization: `Bearer ${jwt}` } });
};

export const useFetchUserByRole = () => {
    return useMutation("allStudent", fetchUserByRole);
};