const mongoose = require('mongoose')
const User = require('../app/models/users-model')
const runScript = async()=>{
    try{

        const db = await mongoose.connect('mongodb://127.0.0.1:27017/table-booking')
        console.log('db is connected')
        const user = new User({
            username:'adminResofy',
            email:'shaikrahid@gmail.com',
            mobile:'9493012901',
            password:'Admin@123',
            role:'admin'
        })
        const checkUser = await User.findOne({email:user.email})
        if(checkUser){
            console.log('account already created');
        }else{
            await user.save()
            console.log('user created ',user);
    
        }
        await db.disconnect()
        console.log('db connection closed');
    }catch(e){
        console.log('error connecting to db',e);
    }

}
runScript()