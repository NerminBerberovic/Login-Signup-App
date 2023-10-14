import React, {useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import './style.css'

function Login() {

    const history=useNavigate();

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [validUsername, setValidUsername]=useState(true)

    async function submit(e){
        e.preventDefault();

        if(email.trim() === "" || password.trim() === "") {
            return setValidUsername(false)
        }else if(password.length < 8) {
            return setValidUsername(false)
        }else {
            try{
                await axios.post("http://localhost:8000/login",{
                    email, password
                })
                .then(res=>{
                    if(res.data==="exist"){
                        history("/home")
                    }
                    else if(res.data==="notexist"){
                        setValidUsername(false)
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

            <h1>Login</h1>

            <form action="POST">
                <input type="email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder='E-mail'/> 
                <br /> 
                { !validUsername && <span>Invalid e-mail or password</span> }
                <br />

                <input type="password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder='Password'/> 
                <br />
                <br />

            <input type="submit" onClick={submit} className='btn'/> <br /> 

            </form> <br />

            <a className="btn" href='/signup'>SignUp</a>

        </div>
    )    
}

export default Login