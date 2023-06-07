const mongoose = require('mongoose');
const { defaultPlaylistThumbnailUrl } = require('./constants');


const playlistSchema = new mongoose.Schema({

    
    playlistName: {
        type:String,
        require:true
    },
    userid: {
        type:String,
        required:[true,"mongo model no userid"],
        index:true
    },
    // creatorName: {
    //     type:String,
    // },
    thumbnailUrl: {
        type:String,
        default:defaultPlaylistThumbnailUrl
    },
    isPrivate: {
        type:Boolean,
        required:true,
        default:false
    },
    isUnlisted: {
        type:Boolean,
        required:true,
        default:false
    },
    createdAt: {
        type:Number,
        default:Date.now()
    },
    count: { //for this field, remember to increment and decrement properly for each update/delete op
        type:Number,
        default:1 //when it's created always 1
    }
    
})

module.exports = mongoose.model("YoutubePlaylist", playlistSchema);