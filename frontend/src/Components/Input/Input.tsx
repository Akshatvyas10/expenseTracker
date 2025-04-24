import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const InputButton = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...rest }, ref) => {
    return (
      <div className="w-full max-w-md">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={className}
          {...rest} // Spread all input props like name, value, onChange, etc.
        />
      </div>
    );
  }
);

export default InputButton;
