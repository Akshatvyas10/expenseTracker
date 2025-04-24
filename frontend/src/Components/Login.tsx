import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form'
import { z } from 'zod';
import axios from 'axios';
import incomeLogin from '../assets/images/loginsigninimage.png';
import PasswordButton from './Input/PasswordInput';
import InputButton from './Input/Input';
import { toast } from 'react-toastify';
import SubmitButton from './Button/SubmitButton';

// Zod validation schema
const validationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, ' Invalid Password '),
});



const Login: React.FC = () => {
  const navigate = useNavigate();


  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post('http://localhost:3000/user/login', value);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('profilePic', response.data.icons);
        toast.success('Login successful');
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
        toast.warning('Invalid email or password.');
      }
    }

  });

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 h-screen">
      <div className="w-screen lg:w-1/2 h-full flex items-center justify-center p-4">

        <form
          className="w-full lg:ml-10"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-4">Your Budget, Your Rules. Sign In to Start.</p>


          <form.Field name="email"
            validators={{
              onChange: ({ value }) => {
                if (value.length <= 0 && z.string().email('Invalid email address')) { return 'Invalid email address' }
              }
            }}
            children={(field) => (
              <div className="mb-4">

                <InputButton
                  label='Email Address'
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Amit@gmail.com"
                  className='md:w-[600px] w-full px-4 py-3 text-sm bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'

                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 mt-1">{field.state.meta.errors}</p>
                )}
              </div>
            )} />


          <form.Field name="password"
            validators={{
              onChange: ({ value }) => {
                if (value.length <= 0) { return 'Invalid Password' }
              }
            }}
            children={(field) => (
              <div className="mb-4">

                <PasswordButton
                  label='Password'
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="x x x x x x x x"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 mt-1">{field.state.meta.errors}</p>
                )}
              </div>
            )} />

          <SubmitButton
            label='Login'
            type="submit"
            className="md:w-[600px] w-full py-3 bg-purple-600 text-white text-xl font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


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
