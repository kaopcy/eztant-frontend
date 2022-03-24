import axios from "axios";

const url = "http://localhost:5000";

export const fetchUser = async userinput => {
    console.log("fetching...");
    const data = await new Promise(resolve => {
        setTimeout(async () => {
            const res = await axios.get(`https://randomuser.me/api/?seed=${userinput.email}`);
            resolve(res);
        }, 2000);
    });
    return data;
};

export const register = async userinput => {
    const { email, password, firstname, lastname, phone } = userinput;
    await axios.post(`${url}/post`, userinput);
};
