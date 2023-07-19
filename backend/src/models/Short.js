const mongoose = require('mongoose')


const ShortSchema = new mongoose.Schema({
    
    thumbnails: {
        default: {
            height:Number,
            url:String,
            width:Number
        },
        high: {
            height:Number,
            url:String,
            width:Number
        },
        medium: {
            height:Number,
            url:String,
            width:Number
        }
    },
    videoName:{
        required:true,
        type:String
    },
    videoId:{
        required:true,
        type:String,
        index:true
    },
    channelName:{
        type:String,
        required:true
    },
    channelId: {
        type:String,
        required:true,
        index:true
    }
   
    
})

module.exports = mongoose.model("Short", ShortSchema);