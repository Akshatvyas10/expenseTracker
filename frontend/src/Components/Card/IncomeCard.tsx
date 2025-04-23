
import { IoAdd } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { format } from 'date-fns';

interface CardTransaction {
    income_source: string;
    amount: string;
    date: string;
    textColor:string;
    bgColor:string
}   
const IncomeCard:React.FC<CardTransaction> = (props) => {
       
  return (

             
    <div className='mt-10 w-1/2 px-8 m-auto dark:text-gray-400 flex justify-center space-x-10'>
    <div className=' w-1/2'>
        <h1 className='text-lg font-semibold uppercase'>{props.income_source}</h1>
        <p className='text-gray-900 font-semibold dark:text-orange-600'>{format(props.date, 'dd/MM/yyyy')}</p>
    </div>
    <div className={`flex lg:w-1/2   justify-center  text-sm ${props.bgColor} hover:shadow-md hover:cursor-pointer space-x-1 py-1 m-auto ${props.textColor} rounded-md px-2`}>
        <IoAdd className=' lg:font-extrabold mt-1' />
        <span>$ {props.amount}</span>
        <AiOutlineStock className='mt-1 ' />
    </div>
</div>

  )
}

export default IncomeCard