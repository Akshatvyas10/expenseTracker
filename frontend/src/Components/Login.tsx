import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import axios from 'axios';
import incomeLogin from '../assets/images/loginsigninimage.png';

// Zod validation schema
const validationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});



const Login: React.FC = () => {
  const navigate = useNavigate();
  const [output, setOutput] = useState<string>('');

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async (data) => {
      alert(data)
      try {
        const response = await axios.post('http://localhost:3000/user/login', data);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('profilePic', response.data.icons);
        setOutput('Login successful');
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
        setOutput('Invalid email or password.');
      }
    },
    validators: {
      onChange: validationSchema,
    },
  });

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 h-screen">
      <div className="w-screen lg:w-1/2 h-full flex items-center justify-center p-4">
        <form onSubmit={form.handleSubmit} className="w-full lg:ml-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-4">Your Budget, Your Rules. Sign In to Start.</p>

          <span className="text-red-600 block text-lg mb-2">{output}</span>

          <form.Field name="email">
            {(field:any) => (
              <div className="mb-4">
                <label className="block mb-1">Email Address</label>
                <input
                  type="email"
                  {...field}
                  placeholder="Amit@gmail.com"
                  className="md:w-[600px] w-full px-4 py-3 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 mt-1">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="password">
            {(field:any) => (
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  {...field}
                  placeholder="Min 6 characters"
                  className="md:w-[600px] w-full px-4 py-3 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 mt-1">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>

          <button
           
            className="md:w-[600px] w-full py-3 bg-purple-600 text-white text-xl font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </p>
        </form>
      </div>

      <div className="h-screen m-auto lg:block hidden object-contain">
        <img src={incomeLogin} alt="Description" className="lg:w-auto md:h-full object-contain" />
      </div>
    </div>
  );
};

export default Login;
