const connectDB = require("./db/connect-db")
const app = require('./app')
const { connectCache } = require("./cache-module")
require('dotenv').config()

if (process.env.NODE_ENV == 'development') {
  setTimeout(()=>{
    process.exit()
  }, 12000000)
}

process.on('exit', ()=>{})

const start = async () => {
    const portes = process.env.API_PORTES
    
    await connectDB()
    // await connectCacåhe()
    app.listen(portes)
    console.log("app listening on port ", portes)
  }
  
  start()