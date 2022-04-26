import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

const register = userdata => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, userdata);
};

export const useRegister = (onSuccess, onError) => {
    return useMutation(register, { onSuccess, onError });
};
