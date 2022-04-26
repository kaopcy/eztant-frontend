import React,{ useState, useEffect } from "react";
import axios from "axios";
import Teacherdisplay from "./Teacherdisplay";


const Teacherdirectory =()=>{
    const [posts, setPosts] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() =>{
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            setPosts(res.data);
            setLoading(false);
            // console.log(res.data)
        };

        fetchPosts();
    }, []);
    
    
    return(
        <div className="w-full h-full min-h-screen bg-zinc-100 pb-[7%] py-[2%] px-[10%]">
            <div  className='flex justify-center flex-wrap'>
                {posts.map(personalData => {
                    return <Teacherdisplay key={personalData.id} post={personalData} loading={Loading}/>
                })}
            </div>
        </div>
    );
}

export default Teacherdirectory

{/* <div className='flex justify-center flex-wrap '>{dataList.map (personalData => {
            return <Teacherdisplay NameTeachert {...personalData} key= {personalData.NameTeacher}/>
        })
            }
            </div> */}
