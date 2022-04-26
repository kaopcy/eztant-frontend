import React, {useState, useEffect} from "react"
import axios from "axios"
import Studentdisplay from "./Studentdisplay";
import Studentpagination from "./Studentpagination"
import { useFetchUserByRole } from "../../../composables/fetch/useFetchUser";
import { v4 as uuid } from "uuid";

const Studentdirectory = () =>{
    const {data:user, isLoading, error, mutate} = useFetchUserByRole();

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(20);

    useEffect(() =>{
        mutate("student")
    }, [mutate ]);

    useEffect(()=>{
        console.log(user?.data.users)
    },[user])

    // Get current posts
// const indexOfLastUser = currentPage * usersPerPage
// const indexOfFirstUser = indexOfLastUser - usersPerPage
// const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser)

    return(
        <div className="w-full h-full min-h-screen bg-zinc-100 pt-[4%] pb-[7%] px-[5%] md:px-[10%] lg:px-[20%]" >
            <div className='flex justify-center flex-col ring-slate-900'>
                {!isLoading && user?.data.users.map(personalData => {
                    return <Studentdisplay key={uuid()} user={personalData} />
                })}
            </div>
        </div>
    )
}
{/* <Studentpagination usersPerPage={usersPerPage} totoalUser={users.length} /> */}
export default Studentdirectory