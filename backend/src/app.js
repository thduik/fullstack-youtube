var express = require('express')
const corsOptions =  require('./configs/cors-config')
const cors = require('cors')
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
const { commentRouter } = require('./routes/comment-router');
const { setCorsHeaders } = require('./utils/corsFunctions');
const { fetchFromApiRouter } = require('./routes/fetchFromApiRouter');
const { getAutoCompleteSuggestions } = require('./controllers/autoComplete/getAutoCompleteSuggestions');


console.log("env vars NODE_ENV == development", process.env.NODE_ENV == "development", "MOCK_AUTH == true", process.env.MOCK_AUTH == "true")

var app = express()

app.enable('trust proxy')

app.use(bodyParser())
app.use(cookieParser())
app.use(helmet());

if (process.env.NODE_ENV == "development") {
    app.use((req,res,next)=>{console.log("app received request"); next()})
}

app.use('/', cors(corsOptions))

app.use('/',setCorsHeaders)

app.post('/logout', logoutApp)

app.use('/', sanitizeRequest)

app.use('/', verifyJwtAccessTokenRequest)


app.use('/cookies',(req,res,next)=>{console.log("req.cookies are", req.cookies);res.send("1")})

app.use('/test', testRouter)

// app.use('/api', appRouter)
// nginx /api proxy_pass removes the original /api from url
app.use('/playlist', playlistRouter)
app.use('/auth', authRouter)
app.use('/youtube', youtubeRouter)
app.use('/comment', commentRouter)
app.use('/rapid/api', fetchFromApiRouter)
app.use('/auto/complete', getAutoCompleteSuggestions)

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router

// you can nest routers by attaching them as middleware:

module.exports = app

