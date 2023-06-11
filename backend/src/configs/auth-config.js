require('dotenv').config()

const development = process.env.NODE_ENV == "development"
console.log("is development", development)
const cookieConfig = {
    secure:true,
    httpOnly:development ? false : true,
    maxAge:20*60*1000
}

module.exports = {cookieConfig}