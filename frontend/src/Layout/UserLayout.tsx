import React, { useEffect } from 'react'
import Navigationbar from '../Components/NavigationBar'
import { Outlet } from 'react-router-dom'
import { SideNavBar } from '../Components/SideNavBar'
import { useSelector } from 'react-redux'

const UserLayout:React.FC = () => {
   const currentMode :any= useSelector((state: any) => state.mode); 
   useEffect(()=>{
          document.querySelector('html')?.classList.remove('light','dark')
          document.querySelector('html')?.classList.add(currentMode)
          },[currentMode])
  
  return (
    <div className=" ">
      <Navigationbar />
    <div className="flex mx- mt-16 pt-4 lg:pl-72  ">
    <SideNavBar />
    <div className='block w-screen  '>
    <Outlet />
    </div>
    </div>
  </div>
  
  )
}

export default UserLayout