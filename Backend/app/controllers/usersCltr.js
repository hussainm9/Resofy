const {validationResult} = require('express-validator')
const User = require('../models/users-model')
const  _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersCltr = {}
usersCltr.register = async(req,res)=>{
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['username','email','password','mobile','role'])
    console.log(body,'body of user');
    try{
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const encryptedPassword = await bcrypt.hash(user.password,salt)
        user.password = encryptedPassword
        const savedUser = await user.save()
        const userCount=await User.countDocuments()
       
        if(userCount==0){
            return user.role=='admin'
        }
        await user.save()
        
        return res.json(savedUser)
        


    }catch(e){
        res.status(500).json(e)


    }
}
usersCltr.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = _.pick(req.body,['email','password'])
    //console.log(body,'body');
    try{

        const user =await User.findOne({email:body.email})
        //console.log(user,'user');
        if(!user){
            
            return res.status(404).json('invalid email/password')
        }
        const result =await bcrypt.compare(body.password,user.password)
        //console.log('password',result);
        if(!result){
            //console.log('user');
            return res.status(404).json('invalid email/password ')
        }
        console.log(user._id,'id');
        const tokenData = {
            id:user._id,
            role:user.role
        }
       const token =  jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
       console.log(token);
       return res.json({token:token})
    }catch(e){
        console.log('Error',e);
        res.status(500).json(e)
    }


}
module.exports = usersCltr

