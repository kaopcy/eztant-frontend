import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faStar } from '@fortawesome/free-solid-svg-icons';

const boomImg = 'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-1/267999607_3085449421781638_3480703431662571325_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeGQVq61-tT53UXhrWz9FdvpD0La5VlMHLEPQtrlWUwcsdzYXWI46An6kB9DRRjW0Gd_4aZGeZR1HE_Vdmiz5e7P&_nc_ohc=zF8tzwHVcskAX8sEaj4&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT_95CNxLf7eQWroKjADU1Z7uj5qCcoQJR5fmAIm1q3CWg&oe=6269D55B'

const Studentdisplay = ({user}) => {
    return (
        <div className='list-group border-b-[1.5px]'>
            <div className='bg-white group-hover:ring-1 ring-slate-300 flex w-full items-center py-[1%] justify-between'>
                <div className='flex h-[full] w-[80%] items-center px-2 md:space-x-6 xs:space-x-3'>
                    <img className='lg:h-[80px] md:h-[65px] h-[50px] w-auto rounded-[70%] overflow-hidden m-[1%] items-center  object-cover' src={(boomImg)} alt=""></img>
                    <div>
                        <h1 className='font-bold text-sm lg:text-xl md:text-lg'>
                            {user.firstname}
                        </h1>
                        <p className='text-text-light text-sm lg:text-xl md:text-lg'>
                        {user.studentID}
                        {user.department}
                        </p>
                    </div>
                </div>
                <div className='space-x-3 static justify-self-end p-[2%]'>
                    <FontAwesomeIcon icon={faMessage} className="cursor-pointer lg:text-3xl text-xl text-secondary"/>
                    <FontAwesomeIcon icon={faStar} className="cursor-pointer lg:text-3xl text-xl text-amber-400"/>
                </div>
            </div>
            
        </div>
    )
    }

export default Studentdisplay
