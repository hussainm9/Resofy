const mongoose = require('mongoose')
const {Schema,model} = mongoose
const userSchema = new Schema({
    username:String,
    email:String,
    mobile:String,
    password:String,
    role:{
        type:String,
        enum:['restaurantOwner','guest']
    }

},{timestamps:true})
const User = model('User',userSchema)
module.exports =  User
