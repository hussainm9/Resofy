const mongoose = require('mongoose')
const configDB = async()=>{
    try{
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/table-booking')
        console.log('server is connected to db');

    }
    catch(err){
        console.log('err connecting to db',err)
    }


}
module.exports = {
    configDB
}