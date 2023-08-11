const express = require('express')
const app = express()
const cors =require('cors')
const configureDB = require('./config/database')
const router = require('./config/router')
require ('dotenv').config()

const port = 3091

//Setup DB
configureDB()
app.use(express.json())
app.use(cors())
app.use(router)


app.listen(port,()=>{
    console.log('port running on port',port)
}) 