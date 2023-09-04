import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MainPage from './Pages/MainPage';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/Home" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
