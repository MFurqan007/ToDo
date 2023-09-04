import React from 'react'
import LoginBg from '../assets/LoginBg.svg';
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';



export default function MainPage() {
    // const [user, setUser] = useState(null);
    useEffect(() => {
        console.log('Hello')
    }, [])

    
  return (
    <>
        <div className='w-screen h-screen absolute z-0'>
            <img src={LoginBg} alt="Background" className='w-screen object-cover h-[100%]' loading='lazy'/>
        </div>
        <div className='w-screen h-screen relative z-10 flex justify-center items-center'>
            <div className='w-[50vw] h-[80vh] border-2 border-[#FFF] flex flex-col justify-start items-center rounded-lg bg-blackrgba backdrop-filter backdrop-blur-[40px]'>    
                <div className="w-[100%] h-[10vh] border-2 border-black flex justify-start items-center">
                    <span className='text-white font-serif text-[24px]'>Welcome</span>
                    <div className='w-2'/>
                    <span className='text-white font-serif text-[24px]'>Username!</span>
                </div>
                <div className='w-[100%] h-[55vh] overflow-y-auto no-scrollbar px-[4vw] border-2 border-black'>
                    <Card/>
                </div>
            </div>
        </div>
    </>
  );
}
