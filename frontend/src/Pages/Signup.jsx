import React from 'react'
import LoginBg from '../assets/LoginBg.svg';
import { useState } from 'react'
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);

    const CreateUser = async (e) =>{
        e.preventDefault()
        try {
          const response = await axios.post(`http://localhost:4000/users/register`, {
            username: `${username}`,
            email: `${email}`,
            password: `${password}`
          });
    
          console.log("Response:",response)
          alert(response.data.message)
          setUsername('')
          setEmail('')
          setPassword('')
          redirectLogin()
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const redirectLogin = () => {
        setLogin(true);
    };
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleEmail = (event) => {
      setEmail(event.target.value);
    };
    const handlePassword = (event) => {
      setPassword(event.target.value);
    };
  return (
    <>
        {login && (
          <Navigate to="/Login" replace/>
        )}
        <div className='w-screen h-screen absolute z-0'>
            <img src={LoginBg} alt="Background" className='w-screen object-cover h-[100%]'/>
        </div>
        <div className='w-screen h-screen relative z-10 flex justify-center items-center'>
            <div className='w-[30vw] h-[70vh] border-2 border-[#FFF] flex flex-col justify-start items-center rounded-2xl bg-blackrgba backdrop-filter backdrop-blur-[40px]'>
                <span className='text-white font-serif font-[500] text-[24px] mt-[5vh]'>SIGNUP</span>
                <input 
                    type='text'
                    className='w-[90%] px-1 mt-[5vh] h-[5vh] bg-transparent border-b-2 border-white outline-none placeholder-white placeholder:font-[12px] focus:text-white' 
                    placeholder='Username'
                    value={username}
                    onChange={handleUsername}
                />
                <input 
                    type='text'
                    className='w-[90%] px-1 mt-[5vh] h-[5vh] bg-transparent border-b-2 border-white outline-none placeholder-white placeholder:font-[12px] focus:text-white' 
                    placeholder='Email'
                    value={email}
                    onChange={handleEmail}
                />
                <input 
                    type='password'
                    className='w-[90%] px-1 mt-[5vh] h-[5vh] bg-transparent border-b-2 border-white outline-none placeholder-white placeholder:font-[12px] focus:text-white' 
                    placeholder='Password'
                    value={password}
                    onChange={handlePassword}
                />
                <div className='w-[90%] h-[5vh] mt-[5vh] flex justify-start items-center'>
                    <span className='text-white font-serif text-[14px]'>Already have an Account? </span>
                <div className='w-[10px]'/>
                    <span 
                        className='text-white font-serif text-[14px] hover:cursor-pointer hover:underline'
                        onClick={redirectLogin}
                    > 
                        Login!
                    </span>
                </div>
                <div className='w-[90%] h-[5vh] mt-[5vh] flex justify-center items-center'>
                    <div 
                        className='group hover:cursor-pointer hover:border-2 hover:border-[#FA7436] hover:bg-white w-[150px] h-[4vh] rounded-[25px] bg-[#FA7436] flex justify-center items-center'
                        onClick={CreateUser}
                    >
                        <span className='group-hover:text-[#FA7436] text-white font-serif text-[14px]'>SignUp</span>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
