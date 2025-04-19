import React from 'react'
import { IoAdd } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { format } from 'date-fns';
interface RecentTransaction {
    income_source: string;
    amount: string;
    date: string;
}
const RecentTransaction:React.FC<RecentTransaction> = (props) => {
        
  return (

       <div className='mt-10 px-8 flex justify-center space-x-10  dark:text-gray-400'>
                    <div className='w-1/2'>
                {/* <img src="" alt="image" /> */}
              
                    <h1 className='text-xl font-semibold '> {props.income_source}</h1>
                    <p className='text-gray-900 font-semibold  dark:text-orange-500'>{format(props.date, 'dd/MM/yyyy')}</p>
                
            </div>
            <div className='flex  lg:w-1/6 text-sm  bg-green-200 hover:shadow-md  dark:text-green-700 hover:cursor-pointer space-x-1 py-1 m-auto text-green-500 rounded-md px-2'><IoAdd className='text-green-500 dark:text-green-600 lg:font-extraboldbold mt-1'/> <span>$ {props.amount}</span><AiOutlineStock  className='mt-1 text-green-500'/></div>
        </div>
        

  )
}

export default RecentTransaction