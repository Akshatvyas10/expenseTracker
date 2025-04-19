import React, { useState } from 'react'
import incomeLogin from '../assets/images/loginsigninimage.png'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
// import { Link } from 'react-router-dom's;

const validation = z.object({
    email : z.string({message:'Email is required'}).email('Enter Correct email'),
    password : z.string().min(1,'Enter Password ')
})
const Login:React.FC = () => {
    type loginFormat = z.infer<typeof validation>
    const navigate = useNavigate()
    const {register,handleSubmit,formState:{errors,touchedFields}} = useForm<loginFormat>({
        resolver:zodResolver(validation)
    })
    const [output,setOutput]=useState<string>()
    function login(data:loginFormat){
        if(data.email&&data.password){
            const loginData = {email:data.email,password:data.password}
            axios.post('http://localhost:3000/user/login',loginData).then((response)=>{
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('user_id', response.data.id);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('profilePic', response.data.icons);
                setOutput('Login successful');
                navigate(`/dashboard`);
            }).catch((err)=>{
                console.error(err);
      setOutput('Invalid email or password.');
            })

        }
    }
  return (
<div className="flex flex-col md:flex-row bg-gray-100 h-screen">
  {/* Login Form */}
  <div className="w-screen lg:w-1/2 h-full flex items-center  justify-center p-4">
    <form onSubmit={handleSubmit(login)} className='w-full lg:ml-10'>

      <h2 className="text-2xl font-bold text-gray-800 mb-2 ">Welcome Back</h2>
      <p className="text-gray-600 mb-4 ">Your Budget, Your Rules. Sign In to Start.</p>
      {/* Input Container with White Background */}
  
        {/* Email Input */}
        <span className='text-red-600 block text-lg'>{output}</span>
       

        <label >Email Address</label>
        {errors.email&&touchedFields.email&&<p className='text-red-600 w-full   inline-block font-semibold'>{errors.email.message}*</p>}
        
        <input
         
          {...register('email')}
          placeholder="Amit@gmail.com"
          className="md:w-[600px]  w-full block px-4 py-3 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        {/* Password Input */}
        
        <label className='' >Password</label>
        {errors.password&&touchedFields.password&&<p className='text-red-600 w-full  m-auto inline-block font-semibold'>{errors.password.message}*</p>}
      
        <input
          type="password"
          {...register('password')}
          
          placeholder="Min 8 characters"
          className="md:w-[600px] w-full block px-4 py-3 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
     

      {/* Submit Button */}
      <button
        type="submit"
        className="md:w-[600px] w-full block py-3 bg-purple-600 text-white text-xl font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>

      {/* Optional Signup Link */}
      <p className="text-sm text-gray-600 mt-4 ">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800">
          Register here
        </Link>
      </p>
    </form>
  </div>

  {/* Right Image Section */}
  <div className="h-screen m-auto lg:block hidden object-contain">
  <img src={incomeLogin} alt="Description" className="lg:w-auto md:h-full  object-contain" />
</div>

</div>

  )
}

export default Login