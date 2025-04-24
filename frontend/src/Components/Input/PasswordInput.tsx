import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
interface InputPassword extends React.InputHTMLAttributes<HTMLInputElement>{
    label?:string
    value?:string;
    onChange?:(e:any)=>void;
    placeholder?:string;
    className?:string
    
    
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputPassword>(
  ({ label, className, ...rest }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full max-w-md py-2 mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center md:w-[600px] w-full px-4 py-3 text-sm bg-gray-100 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
        <input
          ref={ref}
          type={show ? 'text' : 'password'}
          {...rest} 
          placeholder={rest.placeholder || "Password"}
          className="flex-grow bg-gray-100 text-sm text-gray-800 outline-none"
        />
        {show ? (
          <FaRegEye
            size={20}
            className="text-blue-500 cursor-pointer ml-3"
            onClick={() => setShow((prev) => !prev)}
          />
        ) : (
          <FaRegEyeSlash
            size={20}
            className="text-gray-400 cursor-pointer ml-3"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
});

export default PasswordInput;
