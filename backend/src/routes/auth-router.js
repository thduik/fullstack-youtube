const express = require('express');
const { cookieLogin } = require('../controllers/auth/cookie-login');
const { googleAuthRouter } = require('./google-auth')

const authRouter = express.Router();


authRouter.use((req,res,next)=>{console.log("authRouter received request"); next()} )
authRouter.use("/google", googleAuthRouter)
authRouter.use('/cookie/login', cookieLogin)
// appRouter.use("/auth/cookie/login", itemRouter)


module.exports = {authRouter}