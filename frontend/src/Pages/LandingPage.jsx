import React from 'react'
import Logo from "../assets/Logo.svg"
import { useState, useEffect } from 'react'
import DImage from "../assets/DashboardImage.svg"
import { Navigate } from "react-router-dom";

export default function LandingPage() {
    const [loginPage, setLoginPage] = useState(false);
    const [signupPage, setSignupPage] = useState(false);
    const handleLogin = () => {
        setLoginPage(true);
    };
    const handleSignup = () => {
        setSignupPage(true);
    };

  return (
    <>
    {loginPage && (
        <Navigate to="/Login"/>
    )}
    {signupPage && (
        <Navigate to="/SignUp"/>
    )}
    <div className="w-screen h-screen bg-gradient-to-b from-[#FA7436] to-[#fb9d72] flex justify-center items-end">
        <div className='lg:w-[65vw] lg:h-[90vh] lg:bg-white lg:rounded-t-[20px] lg:px-[5vw]'>
            <div className='lg:mt-[10px] lg:w-[100%] lg:h-[10vh] flex justify-between items-center'>
                <div className='w-[10vw] flex justify-between items-center'>
                    <span className='font-semibold font-sans text-[20px]'>TodoBook</span>
                    <img src={Logo} alt='Logo'/>
                </div>
                <div className='w-[24vw] flex justify-between items-center'>
                    <div 
                        className='hover:cursor-pointer hover:bg-[#fef1ea] transition duration-800 ease-in w-[150px] max-w-[150px] h-[40px] max-h-[40px] rounded-md border-2 border-[#FA7436] flex justify-center items-center'
                        onClick={handleLogin}
                    >
                        <span className='text-[#FA7436] text-[16px] font-[500]'>Login</span>
                    </div>
                    <div 
                        className='group hover:cursor-pointer hover:bg-[white] transition duration-800 ease-in w-[150px] max-w-[150px] h-[40px] max-h-[40px] rounded-md bg-[#FA7436] border-2 border-[#FA7436] flex justify-center items-center'
                        onClick={handleSignup}
                    >
                        <span className='text-[white] group-hover:text-[#FA7436] text-[16px] font-[500]'>Sign Up</span>
                    </div>
                </div>
            </div>
            <div className="lg:mt-[5vh]lg:w-[100%] lg:h-[70vh] flex justify-between items-center">
                <div className='basis-[60%] flex flex-col justify-center items-center'>
                    <div className='w-[90%]'>
                        <span className='font-sans font-[700] text-[36px]'>Get started your exciting</span> 
                        <span className='font-sans font-[700] text-[36px] text-[#FA7436]'> journey </span>
                        <span className='font-sans font-[700] text-[36px]'>with us!</span>
                    </div>
                    <div className='w-[90%] mt-[2vh]'>
                        <span className='font-sans font-[400] text-[14px] text-[#666]'>Boost your productivity and stay organized with our intuitive todo website. Streamline your tasks, set priorities, and track your progress effortlessly. Experience the power of efficient task management and take control of your day today!</span> 
                    </div>
                    <div className='w-[90%] mt-[5vh] flex justify-center'>
                        <div className='group hover:cursor-pointer hover:bg-[#FA7436] transition duration-800 ease-in w-[200px] max-w-[200px] h-[40px] max-h-[40px] rounded-md border-2 border-[#FA7436] flex justify-center items-center'>
                            <span className='text-[#FA7436] group-hover:text-[white] text-[16px] font-[500]'>Discover Now!</span>
                        </div>
                    </div>
                    
                </div>
                <div className='basis-[40%]'>
                    <img src={DImage} alt='Main Image'/>
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}
