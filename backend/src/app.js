var express = require('express')
const corsOptions =  require('./configs/cors-config')
var helmet = require("helmet");
const connectDB = require('./db/connect-db')
const { authRouter } = require('./routes/auth-router');
require('dotenv').config()
var bodyParser = require('body-parser');
const { sanitizeRequest } = require('./utils/sanitizeRequest');
const { testRouter } = require('./routes/test-router');

var cookieParser = require('cookie-parser')

var app = express()


app.enable('trust proxy')

app.use(bodyParser())
app.use(cookieParser())
app.use(helmet());


app.use('/', sanitizeRequest)

app.post('/',(req,res,next)=>{
  console.log("app.post sucess")
  // console.log("req.baseurl	",req.baseurl)
  // console.log("	req.hostname", 	req.hostname)
  // console.log("req.protocol",req.protocol)
  // console.log("req.headers", req.headers)
  // console.log("req.secure", req.secure)
  // res.send("hehe fuck you from serverBITCHH")
  next()
})

app.use('/test', testRouter)

app.get('/',(req,res,next)=>{
  console.log("req.auth is", req.auth)
  next()
})


// app.use('/api', appRouter)
// nginx /api proxy_pass removes the original /api from url
app.use('/auth', authRouter)

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router

// you can nest routers by attaching them as middleware:

module.exports = app

