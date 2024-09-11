import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
    const navigate = useNavigate()

useEffect(()=>{
    checkUser()
},[])

const checkUser = async ()=> {
 const userId = await localStorage.getItem('userId') 
 if(userId !== null){
    navigate('/home', {replace: true})
 }else{
    navigate('/login', {replace: true})
 }
}

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <p className="mt-4 text-xl text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
