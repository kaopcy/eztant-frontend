import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const boomImg = 'https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-1/267999607_3085449421781638_3480703431662571325_n.jpg?stp=dst-jpg_p240x240&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeGQVq61-tT53UXhrWz9FdvpD0La5VlMHLEPQtrlWUwcsdzYXWI46An6kB9DRRjW0Gd_4aZGeZR1HE_Vdmiz5e7P&_nc_ohc=zF8tzwHVcskAX8sEaj4&tn=UBK0OC97NryoIjEI&_nc_ht=scontent.fcnx1-1.fna&oh=00_AT_95CNxLf7eQWroKjADU1Z7uj5qCcoQJR5fmAIm1q3CWg&oe=6269D55B'

const Teacherdisplay = ({user}) => {

    return (
        <div className='p-[1%] group'>
            <div className='bg-white group-hover:ring-1 ring-slate-300 w-[230px] h-[270px] p-[3%] justify-center'>
                <img className=' h-[40%] w-auto rounded-[70%] overflow-hidden m-0 items-center mx-[27%] mt-[5%] object-cover' src={(boomImg)} alt=""></img>
                <div className='font-bold text-center justify-center flex-col text-lg pt-[10%]'>
                    {user.firstname}
                </div>
                <div className='font-thin text-center justify-center flex-col text-sm p-[2%]'>
                    {user.department}
                </div>
                <div className='static ml-[14%] mx-[10%] my-[7%] px-[30%]'>
                    <FontAwesomeIcon icon={faMessage} className="cursor-pointer text-2xl text-secondary  sm:text-xl"/>
                </div>
            </div>
        </div>
    )
}


export default Teacherdisplay