const connectDB = require("./db/connect-db")
const app = require('./app')
require('dotenv').config()

if (process.env.NODE_ENV == 'development') {
  setTimeout(()=>{
    process.exit()
  }, 2400000)
}

process.on('exit', ()=>{console.log("processMemoryUsage:",  process.memoryUsage() )})

const start = async () => {
    const portes = process.env.API_PORTES
    
    await connectDB()
    app.listen(portes)
    console.log("app listening on port ", portes)
  }
  
  start()