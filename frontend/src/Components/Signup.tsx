import React, { useState } from 'react'
import incomeLogin from '../assets/images/loginsigninimage.png'
import { Link, useNavigate } from 'react-router-dom'
import z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
const validation = z.object({
    name : z.string().min(2,'Name is required'),
    email : z.string().email('Please enter Email'),
    password : z.string().min(8,'Password must be 8 characters ').max(18,'Password must less then 18 characters ')
})

const Signup:React.FC = () => {
    type signupFormet = z.infer<typeof validation>
    const navigate = useNavigate()
    const {register,handleSubmit,formState:{errors,touchedFields}}= useForm<signupFormet>({
        resolver:zodResolver(validation)
    })
    const[output,setOutput]=useState<string>()
    function signup (data:signupFormet){
        if(data.email&&data.name&&data.password){
            const loginData = {name:data.name, email:data.email, password:data.password}
            axios.post('http://localhost:3000/user/signup',loginData).then((response)=>{
                if (response.data.token) {
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('token', response.data.token);
                    // var role = response.data.role
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('profilePic', response.data.imageUrl);
      
      
                    setOutput('User registered successfully');
                    navigate(`/dashboard`);;
                }
            }).catch((err)=>{
                console.log(err)
                setOutput('User not registered');
            })
        }
    }
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 h-screen ">
    {/* Login Form */}
  <div className="w-screen lg:w-1/2 h-full flex items-center  justify-center p-4">
      <form onSubmit={handleSubmit(signup)} className="">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 ">Create an Account</h2>
        <p className="text-gray-600 mb-4 ">Stay On Top of Your Money—Simple, Smart Expense Tracking Starts Here!</p>
  
        {/* Input Container with White Background */}
        <span className='text-red-600 font-semibold'>{output}</span>
          {/* Email Input */}
          <div className=' flex space-x-4 w-auto'>
            <div>

          {errors.name&&touchedFields.name&&<span className='text-red-600 font-semibold'>{errors.name.message}</span>}<br/>
          <label >Name</label><br/>
          <input
            type="text"
            {...register('name')}
            placeholder="Amit"
            className="md:w-[295px]   w-auto block px-4 py-3 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
  
           
          {/* Email Input */}
         <div>

          {errors.email&&touchedFields.email&&<span className='text-red-600 font-semibold'>{errors.email.message}</span>}<br/>
          <label className='' >Email Address</label><br/>

          <input
            type="email"
            {...register('email')}

            placeholder="Amit@gmail.com"
            className="md:w-[295px]  w-auto block px-4 py-3 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            </div>
         {/* Password Input */}
       

          {errors.password&&touchedFields.password&&<span className='text-red-600 font-semibold'>{errors.password.message}</span>}<br/>
          <label className='' >Password</label><br/>

          <input
            type="password"
            {...register('password')}

            placeholder="Min 8 characters"
            className="md:w-[600px]  w-full block px-4 py-3 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         
           
  
        {/* Submit Button */}
        <button
          type="submit"
          className="md:w-[600px]  w-full block py-3 bg-purple-600 text-white text-xl font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
  
        {/* Optional Signup Link */}
        <p className="text-sm text-gray-600 mt-4 ">
        Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </p>
      </form>
    </div>
  
    {/* Right Image Section */}
    <div className="h-screen m-auto lg:block hidden object-contain">
    <img src={incomeLogin} alt="Description" className="lg:w-auto h-full  object-contain" />
  </div>
  
  </div>
  )
}

export default Signup