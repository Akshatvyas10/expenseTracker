import React, { useState } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { toggleMode } from '../../Reducer/DarkModeSlice';
import { useDispatch } from 'react-redux'; 
function DarkBtn() {
    const dispatch = useDispatch();
   
    const [darkMode, setDarkMode] = useState<string>( 'light');

   
    const onChangeBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const newMode = isChecked ? 'dark' : 'light';
        setDarkMode(newMode);
        
      
        dispatch(toggleMode(newMode)); 
        // alert(currentMode)
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="subscribe"
                onChange={onChangeBtn}
                checked={darkMode === 'dark'}
                className="sr-only peer"
            />
            <label
                htmlFor="subscribe"
                className="flex items-center cursor-pointer space-x-3"
            >
                {darkMode === 'dark' ? (
                    <div className='text-white text-xl hover:bg-slate-800 rounded-full p-2'>
                        <MdLightMode />
                    </div>
                ) : (
                    <div className='text-xl hover:bg-slate-300 rounded-full p-2'>
                        <MdDarkMode />
                    </div>
                )}
            </label>
        </div>
    );
}

export default DarkBtn;
