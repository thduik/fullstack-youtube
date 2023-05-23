const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
   
    userid: {
        type:String,
        required:[true,"mongo model no userid"],
        unique: true
    },
    googleid: {
        type:String,
        unique: true
    },
    name: {
        type: String,
        required:[true,"mongo model no name"]
    },
    username: {
        type: String,
        required:[true,"mongo model no username"]
    },
    email: {
        type: String,
        unique: true
    },
    givenname: {
        type: String
    },
    familyname: {
        type: String
    },
    password: {
        type: String
    },
    pictureurl: {
        type: String
    }
   
})

module.exports = mongoose.model("YoutubeUser", userSchema);