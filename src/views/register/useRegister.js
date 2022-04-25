import axios from "axios";
import { useState } from "react";

export default function useRegister() {
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const onRegister = async (userData, callback) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, userData);
            console.log(res)
            if (callback) callback();

        } catch (error) {
            setError(JSON.stringify(error));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        loading,
        error,
        onRegister,
    };
}
