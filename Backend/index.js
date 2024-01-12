const express = require('express')
const {authenticateUser,authorizedUser}=require('./app/middlewares/authenticateUser')
const app = express()
const port = 3788
app.use(express.json())
require('dotenv').config()
//db
const {configDB} = require('./config/db')
configDB()

//validations
const {checkSchema} = require('express-validator')
const {userRegisterSchema,userLoginSchema} = require('./app/validations/usersSchema')
const {restaurantSchema}=require('./app/validations/restaurantSchema')
//console.log(userLoginSchema);
const usersCltr = require('./app/controllers/usersCltr')
const restaurantCltr=require('./app/controllers/restaurantCltr')

//user
app.post('/api/register',checkSchema(userRegisterSchema),usersCltr.register)
app.post('/api/login',checkSchema(userLoginSchema),usersCltr.login)
//restaurant
app.post('/api/restaurantRegister',authenticateUser,authorizedUser(['restaurantOwner']),checkSchema(restaurantSchema),restaurantCltr.register)


app.listen(port,()=>{
    console.log('server is running',port);
})