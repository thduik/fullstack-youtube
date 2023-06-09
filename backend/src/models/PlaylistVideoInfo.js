// tiny version of videoinfo used for playlist
const mongoose = require('mongoose')


const PlaylistVideoInfoSchema = new mongoose.Schema({
    
    playlistId:{
        //use the _id field of Playlist document, unsensitive data so feel free to pass that shit around
        type:String,
        index:true,
        required:true
    },
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
    thumbnailUrl:String,
    createdAt:Number //createdAt here is actually addedAt, non-sensitive data so whatever
    
})

module.exports = mongoose.model("PlaylistVideoInfo", PlaylistVideoInfoSchema);