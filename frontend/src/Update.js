import React, {useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import './style.css'

function Update() {

    const history=useNavigate();

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [newPassword, setNewPassword]=useState('')
    const [validUsername, setValidUsername]=useState(true)
    const [passLength, setPassLength]=useState(true)

    async function submit(e){
        e.preventDefault();

        if(email.trim() === "" || password.trim() === "" || newPassword.trim() === "") {
            return setValidUsername(false)
        }else if(password.length < 8 || newPassword.length < 8) {
            return setPassLength(false)
        }else {
            try{
                await axios.post("http://localhost:8000/update",{
                    email, password, newPassword
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

            <h1>Change password</h1>

            <form action="POST">
                <input type="email" 
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder='E-mail'/> 
                <br /> 
                { !validUsername && <span>Invalid e-mail or password</span> }
                <br />

                <input type="password" 
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder='Old password'/> 
                <br />
                <br />

                <input type="password" 
                onChange={(e)=>{setNewPassword(e.target.value)}}
                placeholder='Type new password'/> 
                <br />
                { !passLength && <span>Password must contain minimum 8 characters!</span> }
                <br />

            <input type="submit" onClick={submit} className='btn'/> <br /> 

            </form> <br />

            <a className="btn" href='/home'>Home</a>

        </div>
    )    
}

export default Update