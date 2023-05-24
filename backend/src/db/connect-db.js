const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    const mongo_uri = process.env.MONGO_URI
    try {
        await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        )
        console.log("connectDB success")
    } catch(error) {
        console.log("connectDB error: ",error)
    }   
}

module.exports = connectDB