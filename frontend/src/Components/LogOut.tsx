import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogOut:React.FC = () => {
    const navigator = useNavigate();
    useEffect(()=>{
     
                localStorage.clear();
                navigator('/');

         
    },[])
  return (
    <div >
        
    </div>
  )
}

export default LogOut