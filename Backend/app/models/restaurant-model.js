const mongoose=require('mongoose')
const {Schema,model}=mongoose

const resSchema=new Schema({
    name:String,
    address:{
        street:String,
        area:String,
        city:String,
        state:String,
        pincode:Number
    },
    description:String,
    gstNo:String,
    licenseNumber:String,
    image:String,

    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },


},{timestamps:true})
const Restaurant=model('Res',resSchema)
module.exports=Restaurant