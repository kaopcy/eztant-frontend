import axios from "axios";

const url = "http://localhost:5000";

export const fetchUser = async userinput => {
    console.log("fetching...");
    const data = await new Promise(resolve => {
        setTimeout(async () => {
            const res = await axios.get(`https://randomuser.me/api/?seed=${userinput.email}`);
            resolve(res);
        }, 1000);
    });
    return data;
};

export const register = async (userinput, setIsLoading, setError) => {
    // const { email, password, firstname, lastname, phone } = userinput;
    setIsLoading(true);
    try {
        await new Promise(reject => {
            setTimeout(() => {
                alert(userinput);
                reject();
            }, 1000);
        });
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        setError(error.message);
    }
};

export const checkDuplicateEmail = async email => {
    const randomFlag = Math.round(Math.random() * 100) % 2 === 0;
    const isDuplicate = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(randomFlag ? true : false);
        }, 1000);
    });
    return isDuplicate
};
