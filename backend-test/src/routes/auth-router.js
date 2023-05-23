const express = require('express');
const { googleAuthRouter } = require('./google-auth')

const authRouter = express.Router();


authRouter.use("/google", googleAuthRouter)
// appRouter.use("/auth/google", itemRouter)


module.exports = {authRouter}