import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const Directory =(props) => {
    return(
        <div>
            {props.NameTeacher}
            {props.FacTeacher}
            {props.ImgTeacher}
        </div>
    )
}
const Teacherdisplay = ({NameTeacher,FacTeacher,ImgTeacher}) => {
    return (
        <div className='p-[5%] group'>
            <div className='bg-white group-hover:ring-1 ring-slate-300 w-[200px] h-[220px] p-[3%] justify-center'>
                <img className=' h-[40%] w-auto rounded-[70%] overflow-hidden m-0 items-center mx-[27%] mt-[5%]' src={(ImgTeacher)} alt=""></img>
                <div className='font-bold text-center justify-center flex-col text-base pt-[10%]'>
                    <Directory NameTeacher={NameTeacher}/>
                </div>
                <div className='font-thin text-center justify-center flex-col text-xs p-[2%]'>
                    <Directory FacTeacher={FacTeacher}/>
                </div>
                <div className='static ml-[14%] mx-[10%] my-[7%] px-[30%]'>
                    <FontAwesomeIcon icon={faMessage} className="cursor-pointer text-2xl text-secondary  sm:text-xl"/>
                </div>
            </div>
        </div>
    )
}


export default Teacherdisplay