import React from 'react'
import Logo from '../assets/images/Logo.png'

import { Outlet } from 'react-router-dom'

const VisitorLayout:React.FC = () => {
  return (
    <div className='bg-gray-100 '>
       <img src={Logo} alt="Logo" className="w-48 md:h-auto  absolute top-10 left-10" />
       <Outlet/>
    </div>
  )
}

export default VisitorLayout