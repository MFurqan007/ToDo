import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import axios from 'axios';

// Set Axios global configuration
// axios.defaults.baseURL = 'http://localhost:4000'; // Set your API base URL
axios.defaults.withCredentials = true; // Enable sending cookies with requests


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
)
