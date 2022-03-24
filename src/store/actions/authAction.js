import { REQUEST_LOGIN, REQUEST_LOGIN_FAILURE, REQUEST_LOGIN_SUCCESS, LOGOUT } from "./type";
import * as api from "../../api/authApi";

export const login = (userinput, cb) => async dispatch => {
    console.log("fetching...");
    const { email, password } = userinput;
    try {
        dispatch({ type: REQUEST_LOGIN });
        const { data } = await api.fetchUser({ email, password });
        const user = data.results[0] || null;
        if (!user) throw new Error();
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: user });
        if (cb) cb();
    } catch (error) {
        dispatch({ type: REQUEST_LOGIN_FAILURE });
        console.log(error.message);
    }
};

export const logout = () => {
    localStorage.clear('user')
    return { type: LOGOUT };
};
