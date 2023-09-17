import React from 'react'
import LoginBg from '../assets/LoginBg.svg';
import { useState } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggenIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [signUp, setSignUp] = useState(false);

  
  const LoginUser = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:4000/users/login`, {
        email: `${email}`,
        password: `${password}`
      },{
        withCredentials: true,
      },);

      console.log("Response:",response)
      setEmail('')
      setPassword('')

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second.

      alert("User Logged In Successfully!")

      // Navigate
      setIsLoggedIn(true)
    } catch (error) {
      // console.log("Hello Error")
      setError(true)
      setEmail('')
      setPassword('')

      console.error('Error:', error);
    }
  };

  const redirectSignUp = () => {
    setSignUp(true);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
        {isLoggenIn && (
          <Navigate to="/Home" />
        )}
        
        {signUp && (
          <Navigate to="/SignUp" />
        )}

        <div className='w-screen h-screen absolute z-0'>
            <img src={LoginBg} alt="Background" className='w-screen object-cover h-[100%]'/>
        </div>
        <div className='w-screen h-screen relative z-10 flex justify-center items-center'>
            <div className='w-[30vw] h-[60vh] border-2 border-[#FFF] flex flex-col justify-start items-center rounded-2xl bg-blackrgba backdrop-filter backdrop-blur-[40px]'>
                <span className='text-white font-serif font-[500] text-[24px] mt-[5vh]'>LOGIN</span>
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
                <div className='w-[90%] h-[5vh] mt-[5vh]'>
                  {/* Display this Error Meessage when Input field is not validated */}
                  {error && (
                    <span className='text-white font-serif text-[14px]'>Input Field is Empty Or Incorrect</span>
                  )}

                </div>
                <div className='w-[90%] h-[5vh] flex justify-start items-center'>
                  <span className='text-white font-serif text-[14px]'>Don't have an Account? </span>
                  <div className='w-[10px]'/>

                  <span 
                    className='text-white font-serif text-[14px] hover:cursor-pointer hover:underline'
                    onClick={redirectSignUp}
                  > 
                    Signup!
                  </span>
                </div>
                <div className='w-[90%] h-[5vh] flex justify-center items-center'>
                  <div 
                    className='group hover:cursor-pointer hover:border-2 hover:border-[#FA7436] hover:bg-white w-[150px] h-[4vh] rounded-[25px] bg-[#FA7436] flex justify-center items-center'
                    onClick={LoginUser}
                  >
                    <span className='group-hover:text-[#FA7436] text-white font-serif text-[14px]'>Login</span>
                  </div>
                </div>
            </div>
        </div>

    </>
    
  )
}
