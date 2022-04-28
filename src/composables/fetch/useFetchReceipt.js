import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const fetchReceipt = ({ commuID }) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/community/${commuID}/receipt/create`, {}, { headers: { Authorization: `Bearer ${jwt}` } });
};
export const useFetchReceipt = () => {
    return useMutation(fetchReceipt);
};
