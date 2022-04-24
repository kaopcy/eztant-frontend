import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSort, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Studentsearchbar = () => {
return (
<div>
    <div className='flex w-full items-center lg:justify-between justify-center md:space-x-1 lg:space-x-2 flex-wrap'>
        <div className='text-secondary inline-block static m-[1.8%] lg:pl-[18%] xs:pl-0 text-2xl lg:text-4xl font-bold whitespace-nowrap'>
            รายชื่อนักศึกษา
        </div>
        <div className='justify-between space-x-3 xs:justify-center xs:pl-0 lg:pr-[20%] lg:m-[1.8%] inline-block static '>
            <FontAwesomeIcon icon={faArrowLeft} className="sm:hidden cursor-pointer text-2xl text-text-light sm:text-xl " />
            <input className='form-input w-44 h-7 px-3 py-2 rounded-lg ring-1 ring-gray-300'></input>
            <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-2xl text-text-light  sm:text-xl" />
            {<select className=' w-20 h-7 rounded-lg ring-1 ring-gray-300 m-0 focus:text-gray-500'>
            <option className='text-sm'>A-Z</option>
            <option className='text-sm'>Newest</option>
            <option className='text-sm'>Oldest</option>
            </select>}
            <FontAwesomeIcon icon={faSort} className="cursor-pointer text-2xl text-text-light  sm:text-xl" />
        </div>
    </div>
</div>
)
}

export default Studentsearchbar