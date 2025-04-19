
import React, {  useState } from 'react';
import { IoMdAdd } from "react-icons/io";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '../Interceptor/AxiosInterceptor';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const expenseSchema = z.object({
    category : z.string().min(1,'Income Source is required'),
    Amount : z.string({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      }),
    date : z.string().date('date is required')
})



const AddExpenses: React.FC = () => {
    type expensesType = z.infer<typeof expenseSchema>
    type formSchema = expensesType & {
        userId : string | null;
    }
    const navigate =useNavigate()

    const {register,handleSubmit,formState:{errors,touchedFields},reset} = useForm<expensesType>({
        resolver:zodResolver(expenseSchema)
    })
    
    const [isActive, setIsActive] = useState<boolean>(false);
   
  

    // Handle form submission
  async  function addExpensesToDB(data:expensesType) {
        console.log(data)
       
        const user_id = localStorage.getItem('user_id');
        
       
       const formData : formSchema = { userId:user_id ,category :data.category,
        Amount : data.Amount,
        date : data.date}
       
try{

  const response= await  axiosInstance.post('expense/add', {...formData, amount : data.Amount})
     
    setIsActive(false);
    toast.success('Expense Add Successfully')
    
    reset()
    console.log('expense created:', response.data);
    navigate('/dashboard')
}
    
            catch(error) {
                toast.error('Expense Not Add ')
                    reset()
                console.error('Error creating expense:', error);
            };
    }

    return (

        <div>
            <div className="top-10 right-0 fixed m-10">
                <div onClick={() => setIsActive(true)} className="bg-red-400 py-2 dark:text-gray-300 dark:bg-red-800 rounded-xl text-lg text-red-900 hover:bg-red-500 px-4 flex cursor-pointer">
                    <IoMdAdd className='mt-1 pr-1 text-lg ' />
                    <span>Add Expense</span>
                </div>
            </div>

            {isActive && (
                <div className="z-20 text-slate-600 px-4 dark:text-gray-300 dark:bg-gray-700 bg-white md:w-1/2 lg:w-[600px] pb-8 mx-4 md:m-auto pt-10 fixed top-16 right-36 mb:right-[400px] lg:right-[450px] rounded-lg shadow-2xl">
                    <div className='mb-10 text-lg font-bold' >Add income </div>

                    <form onSubmit={handleSubmit(addExpensesToDB)}>


                        {/* Textarea for post content */}
                        <div className='mt-3'>

                           <span className=' text-black dark:text-gray-300'> Expense Source</span>
                        {errors.category&&touchedFields.category&&<div className='text-red-600 font-semibold'>{errors.category.message}</div>}
                            <input
                             
                                className="w-full  border-gray-800 mt-4 ring-2 p-2 dark:text-gray-200 dark:bg-gray-600"
                                placeholder="pizza..."
                                {...register('category')}
                            />
                        </div>

                        


                        <div className='mt-3'>

                        <span className=' text-black dark:text-gray-300'> Amount</span>
                        {errors.Amount&&touchedFields.Amount&&<div className='text-red-600 font-semibold'>{errors.Amount.message}</div>}
                            <input
                                
                                className="w-full  border-gray-800 mt-4 ring-2 p-2 dark:text-gray-200 dark:bg-gray-600"
                                placeholder="149"
                                // type='number'
                                {...register('Amount')}
                                name = 'Amount'
                            />
                        </div>


                        <div className='mt-3'>
                        <span className=' text-black dark:text-gray-300 '> Date</span>
                            {errors.date&&touchedFields.date&&<div className='text-red-600 font-semibold'>{errors.date.message}</div>}
                            <input
                            type='date'
                               
                                className="w-full  border-gray-800 mt-4 ring-2 p-2 dark:text-gray-200 dark:bg-gray-600"
                                placeholder="dd/mm/yyyy"
                                {...register('date')}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 justify-end m-auto">
                            <button
                                
                                className="bg-purple-100  py-2 rounded-xl dark:text-gray-200 dark:bg-red-600 text-lg text-red-900 hover:bg-red-200 px-4 flex cursor-pointer"
                                
                            >
                                Add Expense
                            </button>
                        </div>
                       
                    </form>











                    {/* Close button for post*/}





                    <div className="top-0 right-0 m-1 absolute">
                        <button
                            type="button"
                            onClick={() => setIsActive(false)}
                            className="bg-transparent px-2  m-3 py-1 rounded-xl hover:bg-red-100 cursor-pointer"
                        >
                           X
                        </button>
                    </div>
                </div>
            )}




        </div>
    );
};

export default AddExpenses;
