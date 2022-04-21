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

        const shapedUser = {
            ...user,
            role: "teacher",
            imgURL: user.picture.large,
            firstname: user.name.first,
            lastname: user.name.last,
            department: "computer",
            community: [
                {
                    id: "123465",
                },
                {
                    id: "23131",
                },
                {
                    id: "124124",
                },
            ],
        };

        localStorage.setItem("user", JSON.stringify(shapedUser));
        dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: shapedUser });
        if (cb) cb();
    } catch (error) {
        dispatch({ type: REQUEST_LOGIN_FAILURE });
        console.log(error.message);
    }
};

export const logout = () => {
    localStorage.clear("user");
    return { type: LOGOUT };
};
