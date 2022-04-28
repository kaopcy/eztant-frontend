import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const jwt = JSON.parse(localStorage.getItem("jwt"));
const fetchCommunityByID = id => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/community/${id}`, { headers: { Authorization: `Bearer ${jwt}` } });
};

export const useFetchCommunityByID = () => {
    const { id } = useParams();
    return useQuery(["community", id], () => fetchCommunityByID(id), {
        refetchOnWindowFocus: false,
        select: value => ({
            data: {
                ...value.data,
                community_posts: {
                    ...value.data.community_posts,
                }
            },
            ...value,
        }),
    });
};

const fetchAllAttendanceByUser = (commuID)=>{
    return axios.get(`${process.env.REACT_APP_API_URL}/api/community/${commuID}/attendance/get`)
}

export const useFetchAllAttendanceByUser = ()=>{
    return useQuery('attendence' , fetchAllAttendanceByUser)
}