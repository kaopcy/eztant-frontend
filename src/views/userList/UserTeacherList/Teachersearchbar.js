import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Teachersearchbar = () => {
  return (
    <div>
        <div className='flex h-full items-center md:space-x-1 lg:space-x-3'>
            <div className='text-secondary inline-block static m-[1.8%] mr-[40%] pl-20 text-4xl font-bold whitespace-nowrap'>
                รายชื่ออาจารย์
            </div>
            <input className='form-input w-44 h-7 px-3 py-2 rounded-xl ring-1 ring-gray-300'></input>
            <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-2xl text-text-light  sm:text-xl" />
            <input  className='form-input w-20 h-7 px-3 py-2 rounded-xl ring-1 ring-gray-300'></input>
            <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-2xl text-text-light  sm:text-xl" />
            <button className='bg-primary hover:bg-white hover:text-primary text-white rounded-2xl ring-2 ring-primary m-[0.5%] p-1 pr-[1%] pl-[1%]'>อาจารย์</button>
            <button className='bg-white hover:bg-primary hover:text-white text-primary rounded-2xl ring-2 ring-primary m-[0.5%] p-1 pr-[1%] pl-[1%]'>นักเรียน</button>
      </div>
    </div>
  )
}

export default Teachersearchbar
