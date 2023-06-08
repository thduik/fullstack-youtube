var ObjectID = require("bson-objectid");
const { generateRandomString } = require("../../utils/strings/generateRandomString")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class DataGeneratorCP { //CachePlaylist
    constructor() {
        this.createInputDataFor.bind(this)
        this.returnExpectedDataFor.bind(this)
        this.returnGetPlaylistsOfUserFromCacheData.bind(this)
        this.returnGetAllVideosOfPlaylistFromCache.bind(this)
        this.userDataArr = [] // [ {userid:string, playlistIdArr:[ playlist._id ], userName:string} ]
        this.playlists = [] // [ playlistObject ], because we will be using filter 
        this.playlistToVideoIds = new Map() // { playlist_id : [videoIds] }
        this.videoIdToVideoJson = new Map() // { videoId:{videoJson} }
    }

    createInputDataFor = (funcName) => {
        if (funcName == "createPlaylistCache") {
            const randomNum = getRandomInt(1, 1000).toString()
            const userId = "userId" + randomNum
            // const userName = "userName" + randomNum
            const playlistName = "playlist" + randomNum + getRandomInt(1, 100).toString()
            const platlistData = { userId: userId, playlistName: playlistName }
            console.log("createInputDataFor createPlaylistCache", userId, playlistName)
            const result = createInputDataForcreatePlaylistCache(platlistData) //{playlist:playlist, video:video}
            const { playlist, video } = result
            this.userDataArr.push({ userid: userId, playlistIdArr: [playlist._doc._id.toString()], userName: "fuck" })
            this.playlists.push(result.playlist._doc)
            this.playlistToVideoIds.set(playlist._doc._id.toString(), [video._doc.videoId])
            this.videoIdToVideoJson.set(video._doc.videoId, video)
            // console.log("playlistToVideoIdsTest", this.playlistToVideoIds.get(playlist._doc._id.toString()))
            return result
        }
    }

    returnExpectedDataFor = (funcName, data) => {
        try {
            
                if (funcName=="getPlaylistsOfUserFromCache") {return this.returnGetPlaylistsOfUserFromCacheData(data)}
                if (funcName=="getAllVideosOfPlaylistFromCache") {return this.returnGetAllVideosOfPlaylistFromCache(data)}

        } catch (err) {
            throw ("err returnExpectedDataFor", err)
        }

    }

    returnGetAllVideosOfPlaylistFromCache = (data) => {
        //from 1 playlist id, return all video objects belong to playlist id
        console.log("returnGetAllVideosOfPlaylistFromCache called", data)
        const playlistId = data.playlistId
        const videoIdArr = this.playlistToVideoIds.get(playlistId)
        if (!videoIdArr) { throw("videoIdArr isNUll error" + " "+ this.playlistToVideoIds.keys()[0] + " "+ playlistId)}
        const videoResArr = []
        for (var i = 0;i < videoIdArr.length; i++) {
            const videoRes = this.videoIdToVideoJson.get(videoIdArr[i])
            if (!videoRes) { throw("returnGetAllVideosOfPlaylistFromCache err videoRes null")}
            videoResArr.push(videoRes)
        }
        return videoResArr
        
    }

    returnGetPlaylistsOfUserFromCacheData = (data) => {
        try {
            const { userid } = data; const userData = this.userDataArr.filter(o => o.userid == userid)[0]; const playlistIdArr = userData.playlistIdArr; const playlistArrRes = []
            playlistIdArr.forEach((playlisId) => {
                const playlists = this.playlists.filter(o => o._id == playlisId) //array of playlist objects
                if (playlists.length > 1) { throw ("err playlists.length > 1") }; const pobj = playlists[0]; pobj._id = pobj._id.toString()
                playlistArrRes.push(pobj)
            })
            console.log("returnExpectedDataFor", playlistArrRes)
            return playlistArrRes
        } catch (err) {
            throw ("err returnGetPlaylistsOfUserFromCacheData", err)
        }
    } 
}



const createInputDataForcreatePlaylistCache = ({ userId, playlistName }) => {
    const newPlaylistId = new ObjectID()
    const playlist = {
        playlistName: playlistName,
        userid: userId,
        thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
        isPrivate: true,
        isUnlisted: false,
        createdAt: Date.now(),
        count: 1,
        _id: newPlaylistId,
        // __v: 0
    }

    const videoIdString = generateRandomString("64816588ede41e56207671be".length)
    const video = {
        playlistId: newPlaylistId.toString(),
        videoName: 'VideoName' + getRandomInt(1, 10000).toString(),
        videoId: '5Hnico_qSUc',
        thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
        createdAt: 1686213166594,
        _id: new ObjectID(),
        // __v: 0
    }


    return { playlist: { _doc: playlist }, video: { _doc: video } }
}



module.exports = { DataGeneratorCP }