import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Welcome from "./welcome"
import Update from "./Update"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from 'react'
import './style.css'


function App() {
    return(
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/update" element={<Update/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App