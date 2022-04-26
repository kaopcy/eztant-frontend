import { REQUEST_LOGIN, REQUEST_LOGIN_FAILURE, REQUEST_LOGIN_SUCCESS, LOGOUT, VIEW_NOTIFICATION, GET_USER } from "./type";
import axios from "axios";

const url = "http://localhost:8000";

export const getUser = setIsloading => async dispatch => {
    const jwt = JSON.parse(localStorage.getItem("jwt")) || null;
    if (!jwt) return setIsloading();
    console.log("dwadadwadwada");
    try {
        const { data: userData } = await axios.get(`${url}/api/users/getme`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: GET_USER,
            payload: {
                ...userData,
                imgURL: "https://scontent.fbkk22-4.fna.fbcdn.net/v/t1.6435-9/145036933_2024789844329614_5665229284832997399_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF-G4NBaMMqLeOMgBnXW7Y4zrMy5swv9THOszLmzC_1MUQZpLV0TqUXN4WUpLNo9-pMK8A4LzDscC6NXxX3D41R&_nc_ohc=cKxLkjtPEJkAX_e0ZGq&_nc_ht=scontent.fbkk22-4.fna&oh=00_AT-kYGDUvINidCsJGtx4H2g6dGYrNIDtvUEIICrj5-YoSA&oe=628C67ED",
                studentID: userData.student_id || null,
                studentYear: userData.student_year || null,
            },
        });
    } catch (error) {
        localStorage.clear("jwt");
        console.log(error);
    } finally {
        if (setIsloading) setIsloading();
    }
};

export const login = (userinput, cb) => async dispatch => {
    console.log("wadwadwada");
    try {
        dispatch({ type: REQUEST_LOGIN });
        const {
            data: { token },
        } = await axios.post(`${url}/api/users/login`, userinput);
        await localStorage.setItem("jwt", JSON.stringify(token));
        dispatch({ type: REQUEST_LOGIN_SUCCESS });
        if (cb) cb();
    } catch (error) {
        console.log(error);
        dispatch({ type: REQUEST_LOGIN_FAILURE });
    }
    dispatch(getUser());
};

export const register = (userinput, cb) => async dispatch => {
    try {
        const { data } = await axios.post(`${url}/api/users/register`, userinput);
        console.log(data);
        if (cb) cb();
        console.log("success");
    } catch (error) {
        console.log(error.response.data);
    }
};

export const logout = () => {
    localStorage.clear("jwt");
    return { type: LOGOUT };
};

export const viewNotification = () => {
    return { type: VIEW_NOTIFICATION };
};
