import React from 'react'
import './style.css'


function Home() {
    return(

        <div className="homePage">
            <a className="btn" href='/login'>Log out</a><a className="btn" href='/update'>Change password</a>
            <h1>Hello. Welcome to the web site.</h1>
        </div>
    )
} 

export default Home