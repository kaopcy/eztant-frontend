import React,{ useState, useEffect, useMemo } from "react";
import axios from "axios";
import Teacherdisplay from "./Teacherdisplay";
import { useFetchUserByRole } from "../../../composables/fetch/useFetchUser";
import { v4 as uuid } from "uuid";

const Teacherdirectory =()=>{
    const {data:user, isLoading, error, mutate} = useFetchUserByRole();

    useEffect(() =>{
        mutate("teacher")
    }, [mutate ]);

    useEffect(()=>{
        console.log(user?.data.users)
    },[user])
    // const newUser = useMemo(()=>{
    //     return user?.data.slice(0,-1)
    // },[user])
    return(
        <div className="w-full h-full min-h-screen bg-zinc-100 pb-[7%] py-[2%] px-[10%]">
            <div  className='flex justify-center flex-wrap'>
                {!isLoading && user?.data.users.map(personalData => {
                    return <Teacherdisplay key={uuid()} user={personalData}/>
                })}
            </div>
        </div>
    );
}

export default Teacherdirectory
