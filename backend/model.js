const mongoose = require('mongoose')

const newSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    birthDate:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
    type:Date,
    default:Date.now
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports=collection