var express = require('express')
const corsOptions =  require('./configs/cors-config')
var helmet = require("helmet");
const connectDB = require('./db/connect-db')
const { authRouter } = require('./routes/auth-router');
require('dotenv').config()
var bodyParser = require('body-parser');
const { sanitizeRequest } = require('./utils/sanitizeRequest');

var app = express()


app.enable('trust proxy')

app.use(bodyParser())

// app.use(helmet());


// app.use(function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     // res.header("Access-Control-Allow-Origin", "http://mydomain:3006"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,text/plain,application/json");
//     next();
//   });

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

app.use('/test', )

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


const start = async () => {
  const portes = process.env.API_PORTES
  const mongo_uri = process.env.MONGO_URI
  await connectDB(mongo_uri)
  app.listen(portes)
  console.log("app listening on port ", portes)
}

start()