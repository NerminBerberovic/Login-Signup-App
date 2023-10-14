import React from 'react'
import './style.css'


function Welcome() {
    return(

        <div className="homePage">
            <a className="btn" href='/login'>Login</a><a className="btn" href='/signup'>SignUP</a>
            <h1>Welcome to the web site.</h1>
        </div>
    )
} 

export default Welcome