import React, { useState, useEffect } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { BiLineChartDown } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import Avtar from '../assets/images/Avtar.png';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SideNavBar: React.FC = () => {
    const userName = localStorage.getItem('name') || 'Guest';
    const profilePic = localStorage.getItem('profilePic') || Avtar;
    const navigate = useNavigate();
    const userId: any = localStorage.getItem('user_id');
    const icons: any = localStorage.getItem('profilePic');
    const [file, setFile] = useState<File | null>(null);

    // Revoke object URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (file) {
                URL.revokeObjectURL(URL.createObjectURL(file));
            }
        };
    }, [file]);

    // Logout Function
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logged Out!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
                
                navigate('/logout');
            }
        });
    };

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
  
        event.preventDefault();

        if (!file) {
            Swal.fire("No File", "Please select an image to upload.", "error");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', userId);

        try {
            const response = await axios.post('http://localhost:3000/user/icons', formData);
            Swal.fire("Success", "Image uploaded successfully!", "success");

            // Update the profile picture after upload
            if (response.data.imageUrl) {
                localStorage.setItem('profilePic',response.data.imageUrl);
            }
            // setFile(null)
        } catch (error: any) {
            console.error('Upload error:', error);
            const errorMsg = error.response?.data?.message || 'Failed to upload the image. Please try again.';
            Swal.fire("Error", errorMsg, "error");
        }
    };

    return (
        <div className="hidden lg:flex h-screen text-left dark:bg-gray-900 dark:text-gray-400">
            <div className="lg:w-[250px] md:w-1/5 dark:bg-gray-900 dark:text-gray-400 border-r-2 shadow-md text-black p-4 fixed top-16 left-0 z-10 h-screen">
                <div className='w-1/2 text-center m-auto my-10 cursor-pointer'>
                    <form >
                        <div className="profile flex justify-center py-4">
                            {}
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <img
                                    src={icons ?`.${icons}` : profilePic}
                                    alt="Profile"
                                    className="rounded-full w-24 h-24 mt-2"
                                />
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
        
                    </form>
                    <h1 className='mt-4 text-xl font-semibold uppercase'>{userName}</h1>
                </div>

                <ul className='text-left ml-8'>
                    <NavLink to='/dashboard' className="mb-4 hover:bg-gray-400 p-2 text-xl text-left cursor-pointer font-semibold flex space-x-4 m-auto rounded">
                        <MdDashboard className='text-blue-500' /><span>Dashboard</span>
                    </NavLink>

                    <NavLink to='/income' className="mb-4 hover:bg-gray-400 p-2 text-xl text-left cursor-pointer font-semibold flex space-x-4 m-auto rounded">
                        <FaCoins className='text-yellow-500' /><span>Income</span>
                    </NavLink>

                    <NavLink to='/expense' className="mb-4 hover:bg-gray-400 p-2 text-xl text-left cursor-pointer font-semibold flex space-x-4 m-auto rounded">
                        <BiLineChartDown className='text-red-500' /><span>Expense</span>
                    </NavLink>

                    <li className="mb-4 hover:bg-gray-400 p-2 text-xl text-left cursor-pointer font-semibold flex space-x-4 m-auto rounded" onClick={handleLogout}>
                        <FiLogOut /><span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
