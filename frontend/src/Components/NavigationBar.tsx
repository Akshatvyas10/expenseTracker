import Logo from '../assets/images/logo1.webp';
import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { BiLineChartDown } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { VscThreeBars } from "react-icons/vsc";
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import DarkBtn from './Button/ThemeButton';

const menuItems = [
    { to: '/dashboard', icon: <MdDashboard className='text-blue-400' />, label: 'Dashboard' },
    { to: '/income', icon: <FaCoins className='text-yellow-500' />, label: 'Income' },
    { to: '/expense', icon: <BiLineChartDown className='text-red-500' />, label: 'Expense' }
];

const Navigationbar: React.FC = () => {
    const navigator = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => setIsActive(prev => !prev);

    const Logout = () => {
        const currentPath = location.pathname;

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert to this page!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Logged Out!", "", "success");
                localStorage.clear();
                navigator('/');
            } else {
                navigator(currentPath);
            }
        });
    };

    return (
        <nav className="w-full h-16 bg-white dark:bg-gray-900 dark:text-gray-400 shadow-md fixed top-0 left-0 flex justify-between items-center px-4 border-b-2 border-blue-500 z-10">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <img src={Logo} alt="Logo" className="w-16 h-14" />
                <span className="hidden lg:flex text-xl font-bold">Expenses Tracker</span>
                <DarkBtn/>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex lg:hidden space-x-8 mr-4 dark:bg-gray-900 dark:text-gray-400">
                {menuItems.map(({ to, icon, label }) => (
                    <Link key={label} to={to} className="text-lg font-medium flex items-center space-x-2">
                        {icon}
                        <span>{label}</span>
                    </Link>
                ))}
                <li onClick={Logout} className="text-lg font-medium flex items-center space-x-2 cursor-pointer">
                    <FiLogOut />
                    <span>Logout</span>
                </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden dark:bg-gray-900 dark:text-gray-400">
                <VscThreeBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
            </div>

            {/* Mobile Menu */}
            {isActive && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-20 dark:bg-gray-900 dark:text-gray-400">
                    <ul className="flex flex-col space-y-4 p-4">
                        {menuItems.map(({ to, icon, label }) => (
                            <Link key={label} to={to} onClick={toggleMenu} className="text-lg font-medium flex items-center space-x-2">
                                {icon}
                                <span>{label}</span>
                            </Link>
                        ))}
                        <li onClick={() => { toggleMenu(); Logout(); }} className="text-lg font-medium flex items-center space-x-2 cursor-pointer">
                            <FiLogOut />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navigationbar;
