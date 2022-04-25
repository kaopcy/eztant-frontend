import React, {useState, useEffect} from "react"
import axios from "axios"
import { Studentdisplay } from "./Studentdisplay";
import Studentpagination from "./Studentpagination"

const Studentdirectory = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(20);

useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(res.data);
        setLoading(false);
        console.log(res.data)
    }
    fetchUsers();
}, [])

    // Get current posts
const indexOfLastUser = currentPage * usersPerPage
const indexOfFirstUser = indexOfLastUser - usersPerPage
const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

    return(
        <div className="w-full h-full min-h-screen bg-zinc-100 pt-[4%] pb-[7%] px-[5%] md:px-[10%] lg:px-[20%]" >
            <div className='flex justify-center flex-col ring-slate-900'>
                {users.map(personalData => {
                    return <Studentdisplay key={personalData.id} users={personalData} loading={loading}/>
                })}
            </div>
        </div>
    )
}
{/* <Studentpagination usersPerPage={usersPerPage} totoalUser={users.length} /> */}
export default Studentdirectory