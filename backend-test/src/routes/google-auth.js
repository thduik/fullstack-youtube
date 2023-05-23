const expresso = require('express');
const googleAuthRouter = expresso.Router();

const { googleLogin } = require('../controllers/auth/google-auth');

//full path is /auth/google/login
googleAuthRouter.post("/login", googleLogin)

module.exports = {googleAuthRouter}