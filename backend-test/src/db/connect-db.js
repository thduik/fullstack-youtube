const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
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