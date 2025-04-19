import React from 'react'
import { RiSubtractLine } from "react-icons/ri";
import { CgArrowBottomRight } from "react-icons/cg";
import { format } from 'date-fns';


interface ExpensesTransaction {
    category: string;
    amount: string;
    date: string;
}
const RecentExpenseCard: React.FC<ExpensesTransaction> = (props) => {


    return (


        <div className='mt-10 px-8 flex justify-center space-x-10  dark:bg-gray-800'>
    <div className=' w-1/2'>
                {/* <img src="" alt="image" /> */}
                <div>
                    <h1 className='text-xl font-semibold dark:text-gray-400'> {props.category}</h1>
                    <p className='text-gray-900 dark:text-orange-600 font-semibold'>{format(props.date, 'dd/MM/yyyy')}</p>
                </div>
            </div>
            <div className='flex lg:w-fit text-sm bg-red-200 hover:shadow-md hover:cursor-pointer space-x-1 py-1 m-auto text-red-500 rounded-md px-2'><RiSubtractLine className='text-red-600 font-bold mt-1' /> <span>$ {props.amount}</span><CgArrowBottomRight className='mt-1 text-red-600' /></div>


        </div>



    )
}

export default RecentExpenseCard