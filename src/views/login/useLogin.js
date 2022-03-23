import { useState, useContext } from "react";
import { AuthContext } from "../../composables/context/auth";
import { useUserinput } from "../../composables/context/useUserinputContext";
import axios from "axios";

export const useLogin = cb => {
    const [isLoading, setIsLoading] = useState(false);
    const state = useContext(AuthContext);
    const userinput = useUserinput();
    console.log(userinput);
    const login = async () => {
        setIsLoading(true);
        const data = await new Promise(resolve => {
            setTimeout(async () => {
                const res = await axios.get(`https://randomuser.me/api/?seed=${userinput.email}`);
                const fakeUser = res.data.results[0];
                resolve(fakeUser);
            }, 100);
        });
        console.log(data);
        setIsLoading(false);
        state.login({
            email: userinput.email,
            firstname: data.name.first,
            lastname: data.name.last,
            gender: data.gender,
            imgURL: data.picture.medium,
            jwtToken: data.login.uuid,
        });
        cb();
    };

    return { login, isLoading };
};
