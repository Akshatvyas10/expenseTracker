
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '../Interceptor/AxiosInterceptor';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const incomeSchema = z.object({
    income_source: z.string().min(1, 'Income Source is required'),
    Amount: z.string().min(0, 'Amount must be a positive number'),
    date: z.string().date('date is required')
})


const AddIncome: React.FC = () => {
    const navigate = useNavigate()
    type incomeType = z.infer<typeof incomeSchema>

    const { register, handleSubmit, formState: { errors, touchedFields }, reset } = useForm<incomeType>({
        resolver: zodResolver(incomeSchema)
    })

    const [isActive, setIsActive] = useState<boolean>(false);



    // Handle form submissions
    async function addIncomeToDB(data: incomeType) {

        const user_id = localStorage.getItem('user_id');


        const formData = {
            userId: user_id, income_source: data.income_source,
            Amount: data.Amount,
            date: data.date
        }

        try {

            const response = await axiosInstance.post('http://localhost:3000/income/add', formData)

            setIsActive(false);
            toast.success('Income Add Successfully')
            navigate('/dashboard')
            console.log('Post created:', response.data);
            reset()


        }
        catch (error) {
            toast.error('Income Not Add ')
            reset()
            setIsActive(false)
            console.error('Error creating post:', error);
        }
    }

    return (

        <div>
            <div className="top-10 right-0 fixed m-10 ">
                <div onClick={() => setIsActive(true)} className="bg-purple-200 py-2 dark:text-gray-300 dark:bg-purple-800 rounded-xl text-lg text-purple-900 hover:bg-purple-200 px-4 flex cursor-pointer">
                    <IoMdAdd className='mt-1 pr-1 text-lg ' />
                    <span>Add income</span>
                </div>
            </div>

            {isActive && (
                <div className="z-20 text-slate-600 px-4 dark:bg-gray-800 dark:text-gray-300 bg-white md:w-1/2 lg:w-[600px] pb-8 mx-4 md:m-auto pt-10 fixed top-16 right-36 mb:right-[400px] lg:right-[450px] rounded-lg shadow-2xl">
                    <div className='mb-10 text-lg font-bold' >Add income </div>

                    <form onSubmit={handleSubmit(addIncomeToDB)}>


                        {/* Textarea for post content */}
                        <div className='mt-3'>

                            <span className=' text-black dark:text-gray-300'> Income Source</span>
                            {errors.income_source && touchedFields.income_source && <div className='text-red-600 font-semibold'>{errors.income_source.message}</div>}
                            <input

                                className="w-full  border-gray-800 mt-4 ring-2 p-2 dark:bg-gray-800 dark:text-gray-300"
                                placeholder="Salary..."
                                {...register('income_source')}
                            />
                        </div>




                        <div className='mt-3'>

                            <span className=' text-black dark:text-gray-300'> Amount</span>
                            {errors.Amount && touchedFields.Amount && <div className='text-red-600 font-semibold'>Enter valid Amount</div>}
                            <input

                                className="w-full  border-gray-800 mt-4 ring-2 p-2 dark:bg-gray-800 dark:text-gray-300"
                                placeholder="$40,000..."
                                {...register('Amount')}
                                type='number'
                            />
                        </div>


                        <div className='mt-3'>
                            <span className=' text-black dark:text-gray-300'> Date</span>
                            {errors.date && touchedFields.date && <div className='text-red-600 font-semibold'>{errors.date.message}</div>}
                            <input
                                type='date'

                                className="w-full  border-gray-800 mt-4 ring-2 p-2 dark:bg-gray-800 dark:text-gray-300"
                                placeholder="DD/MM/YYY..."
                                {...register('date')}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 justify-end m-auto">
                            <button

                                className="bg-purple-100 dark:bg-purple-600 dark:text-gray-300 py-2 rounded-xl text-lg text-purple-900 hover:bg-purple-200 px-4 flex cursor-pointer"

                            >
                                Add Income
                            </button>
                        </div>

                    </form>











                    {/* Close button for post*/}





                    <div className="top-0 right-0 m-1 absolute ">
                        <button
                            type="button"
                            onClick={() => setIsActive(false)}
                            className="bg-transparent px-2  m-3 py-1 rounded-xl hover:bg-gray-100 cursor-pointer"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}




        </div>
    );
};

export default AddIncome;
