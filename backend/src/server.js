const connectDB = require("./db/connect-db")
const app = require('./app')



setTimeout(()=>{
  process.exit()
}, 1200000)


const start = async () => {
    const portes = process.env.API_PORTES
    
    await connectDB()
    app.listen(portes)
    console.log("app listening on port ", portes)
  }
  
  start()