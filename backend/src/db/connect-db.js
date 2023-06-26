const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    // const mongo_uri = process.env.MONGO_URI redis://redis_cache:6379
    const mongo_uri = 'mongodb://db:27017'
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