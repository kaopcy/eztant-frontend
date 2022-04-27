import axios from "axios";
import { useMutation } from "react-query";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const uploadTranscript = formdata => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/transcript`,
        formdata,
        { headers: { Authorization: `Bearer ${jwt}` } }
    );
};

export const useUploadTranscript = onSuccess => {
    return useMutation(uploadTranscript, { onSuccess });
};
