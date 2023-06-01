var express = require('express')
const corsOptions =  require('./configs/cors-config')
var helmet = require("helmet");
const connectDB = require('./db/connect-db')
const { authRouter } = require('./routes/auth-router');
require('dotenv').config()
var bodyParser = require('body-parser');
const { sanitizeRequest } = require('./utils/sanitizeRequest');
const { testRouter } = require('./routes/test-router');
const {youtubeRouter} = require('./routes/youtube-router')
var cookieParser = require('cookie-parser');
const { verifyJwtAccessTokenRequest, logoutApp } = require('./auth-module');
const { playlistRouter } = require('./routes/playlist-router');



console.log("NODE_ENV", process.env.NODE_ENV)

var app = express()


app.enable('trust proxy')

app.use(bodyParser())
app.use(cookieParser())
app.use(helmet());


app.post('/logout', logoutApp)


app.use('/', sanitizeRequest)
app.use('/', verifyJwtAccessTokenRequest)

app.use('/cookies',(req,res,next)=>{console.log("req.cookies are", req.cookies);res.send("1")})

app.post('/',(req,res,next)=>{
  console.log("app.post sucess")
  next()
})

app.use('/test', testRouter)




// app.use('/api', appRouter)
// nginx /api proxy_pass removes the original /api from url
app.use('/playlist', playlistRouter)
app.use('/auth', authRouter)
app.use('/youtube', youtubeRouter)
// you need to set mergeParams: true on the router,
// if you want to access params from the parent router

// you can nest routers by attaching them as middleware:

module.exports = app

