import React, { useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import './style.css'

function Login() {

    const history=useNavigate();

    const [fullName, setfullName]=useState('')
    const [birthDate, setbirthDate]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [validData, setValidData]=useState(true)
    const [alreadyUser, setAlreadyUser]=useState(true)
    const [passLength, setPassLength]=useState(true)
    

    async function submit(e){
        e.preventDefault();

        if(fullName.trim() === "" || birthDate.trim() === "" || email.trim() === "" || password.trim() === "") {
            return setValidData(false)
        }else if(password.length < 8) {
            return setPassLength(false)

        }else {
            try{
                    await axios.post("http://localhost:8000/signup",{
                        fullName, birthDate, email, password
                    })
                    .then(res=>{
                        if(res.data==="exist"){
                            setAlreadyUser(false)
                        }
                        else if(res.data==="notexist"){
                            history("/home")
                        }
                    })
                    .catch(error=>{
                        alert("Wrong details")
                        console.log(error)
                    })
            } 
            catch(e){
                    console.log(e)
            }
        }
    }

    return(
        <div className='box'>

            <h1>Sign Up</h1>

            <form action="POST">

                <input type="text" 
                onChange={(e)=>{setfullName(e.target.value)}}
                placeholder='Full name'/> 
                <br /> 
                <label className='label'>Birthdate</label> 
                <br />
                
                <input type="date" 
                onChange={(e)=>{setbirthDate(e.target.value)}}
                placeholder='Birth date'/> <br /> <br />

                <input type="email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder='Email'/> <br /> <br />

                <input type="password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder='Password'/> 
                <br /> 
                { !validData && <span>All fields are required!</span> }
                { !alreadyUser && <span>User already exists!</span> }
                { !passLength && <span>Password must contain minimum 8 characters!</span> }
                <br />

            <input type="submit" onClick={submit} className='btn'/> <br /> 

            </form> <br />

            <a className="btn" href='/login'>Login</a>
            
        </div>
    )    
}

export default Login