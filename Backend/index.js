const express = require('express')
const app = express()
const port = 3786
app.use(express.json())
require('dotenv').config()
//db
const {configDB} = require('./config/db')
configDB()

//validations
const {checkSchema} = require('express-validator')
const {userRegisterSchema,userLoginSchema} = require('./app/validations/usersSchema')
//console.log(userLoginSchema);
const usersCltr = require('./app/controllers/usersCltr')


app.post('/api/register',checkSchema(userRegisterSchema),usersCltr.register)
app.post('/api/login',checkSchema(userLoginSchema),usersCltr.login)
app.listen(port,()=>{
    console.log('server is running');
})