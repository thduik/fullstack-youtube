// tiny version of videoinfo used for playlist
const mongoose = require('mongoose')


const PlaylistVideoInfoSchema = new mongoose.Schema({
    playlistId:{
        //use the _id field of Playlist document, unsensitive data
        type:String,
        index:true,
        required:true
    },
    videoName:{
        required:true,
        type:String
    },
    videoId:{
        required:true,
        type:String
    },
    channelName:String,
    thumbnailUrl:String,
    createdAt:Number //createdAt here is actually addedAt, non-sensitive data so whatever
    
})

module.exports = mongoose.model("PlaylistVideoInfo", PlaylistVideoInfoSchema);