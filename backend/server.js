const express = require('express')
const mongoose = require('mongoose')
const collection = require('./model')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())


mongoose.connect('mongodb+srv://Nermin:Nermin@cluster0.yx5fydj.mongodb.net/Login?retryWrites=true&w=majority')
.then(()=>{
    console.log("Database connected")
})
.catch(()=>{
    console.log('Connection failed')
})


app.get("/", cors(), (req, res)=>{})

app.post("/login", async (req, res)=>{
    const{ email, password }=req.body
    
    if(email.trim() === "" || password.trim() === "") {
        throw new Error("Error 400 (Bad request): Invalid e-mail or password")
    }else if(password.length < 8) {
        throw new Error("Error 400 (Bad request): Invalid e-mail or password")

    }else {
        try{
            const check = await collection.findOne({email:email, password:password})

            if(check){
                res.json("exist")
            }
            else{
                res.json("notexist")
            }
        }
        
        catch(error){
            res.json("notexist")
        }
    } 
})


app.post("/signup", async(req, res)=>{
    const{fullName, birthDate, email, password}=req.body

    const data={
        fullName:fullName,
        birthDate:birthDate,
        email:email,
        password:password
    }

    if(fullName.trim() === "" || birthDate.trim() === "" || email.trim() === "" || password.trim() === "") {
        throw new Error("Error 400 (Bad request): All fields are required!")
    }else if(password.length < 8) {
        throw new Error("Error 400 (Bad request): All fields are required!") //return response.status(400).send({message: "All fields are required!"})

    }else {
        try{
            const check = await collection.findOne({email:email, password:password})

            if(check){
                res.json("exist")
            }
            else{
                res.json("notexist")
                await collection.insertMany([data])
            }
        }
        
        catch(error){
            res.json("notexist")
        }
    }
})

app.post("/update", async (req, res)=>{
    const{ email, password, newPassword }=req.body
    
    if(email.trim() === "" || password.trim() === "") {
        throw new Error("Error 400 (Bad request): Invalid e-mail or password")
    }else if(password.length < 8 || newPassword.length < 8) {
        throw new Error("Error 400 (Bad request): Invalid e-mail or password")

    }else {
        try{
            const check = await collection.findOne({email:email, password:password})

            if(check){
                res.json("exist")
                await collection.findOneAndUpdate({email:email}, {password:newPassword}, {new: true})
            }
            else{
                res.json("notexist")
            }
        }
        
        catch(error){
            res.json("notexist")
        }
    } 
})

app.listen(8000, ()=> console.log("Server is Up and runing"))