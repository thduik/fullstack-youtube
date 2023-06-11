var ObjectID = require("bson-objectid");
const { generateRandomString } = require("../../utils/strings/generateRandomString")
const {objectEqual, createInputDataForcreatePlaylistCache, createVideoForPlaylist,getRandomInt} = require("./utils");
const { deletePlaylistOfUserCache } = require("../playlist");


/*
    the principle of this class is to create 1 data object for each user/playlist when the corresponding createInputDataFor is called
    for example, if you call createInputDataFor("createPlaylistCache"), each user gets 1 more playlist and state is updated
    if you call createInputDataFor("addVideoToPlaylistsCache"), each playlist gets 1 more song and state is updated
    This dataGenerator class is completely stateless externally and needs no input. data are pseudo-randomly generated and corresponding expected data is returned when 
    returnExpectedDataFor is called. createInputDataFor returns data that strictly meet input req for cache functions
*/


class DataGeneratorCP { //CachePlaylist
    constructor() {
        this.createInputDataFor.bind(this)
        this.returnExpectedDataFor.bind(this)
        this.returnGetPlaylistsOfUserFromCacheData.bind(this)
        this.returnGetAllVideosOfPlaylistFromCache.bind(this)
        this.createUserAndReturnUserId.bind(this)
        this.returnCurrentUserids.bind(this)

        this.userDataArr = [] // [ {userid:string, userName:string} ]
        this.userIdToPlaylistArrMap = new Map() //{userId:[playlistId]}
        this.playlists = [] // [ playlistObject ], because we will be using filter 
        this.playlistToVideoDocArr = new Map() // { playlist_id : [{vidDoc}] }
        this.videoIdToVideoJson = new Map() // { videoId:{videoId:,thumbnailUrl:,videoName:} }, not including createdAt and playlistId for each playlist
        
    }



    returnCurrentPlaylistIds = () => {//return [playlistid] that currently exists
        return this.playlists.map(o => o._id)
    }
    returnCurrentUserids = () => { //return [userid] that currently exists
        return this.userDataArr.map(o => o.userid)
    }

    createUserAndReturnUserId = () => {
        //create a new user
        const randomNum = getRandomInt(1, 1000000).toString()
        const userId = "userId" + randomNum
        const userName = "userName" + randomNum
        this.userDataArr.push({ userid: userId, userName: userName })

        this.userIdToPlaylistArrMap[userId] = []
        return userId
        // const userName = "userName" + randomNum
    }



    createInputDataFor = (funcName) => {

        if (funcName == "deletePlaylistOfUserCache") {//[ {userId:userId, playlistId:removedPId} ]
            const resArr = []
            for (const userId of this.userIdToPlaylistArrMap.keys()) {
                var playlistIdArr = this.userIdToPlaylistArrMap.get(userId);const length0 = playlistIdArr.length
                const removedPId = playlistIdArr[getRandomInt(0, playlistIdArr.length - 1)]
                playlistIdArr = playlistIdArr.filter(o=>o != removedPId);if (length0 - playlistIdArr.length == 0) {throw("err deletePlaylistOfUserCache length not reduced")}
                this.userIdToPlaylistArrMap.set(userId, playlistIdArr)
                resArr.push({userId:userId, playlistId:removedPId})
            }
            return resArr //[ {userId:userId, playlistId:removedPId} ]
        }

        if (funcName == "deleteVideoFromPlaylistCache") {//each playlist remove 1 random video,=> return arr of [videoDoc], 1 videoDoc per playlist
            const resArr = []
            for (const playlistId of this.playlistToVideoDocArr.keys()) {
                var videoDocArr = this.playlistToVideoDocArr.get(playlistId)
                const removeVideoIdx = getRandomInt(0,videoDocArr.length-1)
                const removedVideo = videoDocArr[removeVideoIdx]; const length0 = videoDocArr.length
                videoDocArr = videoDocArr.filter(o=>o.videoId !=removedVideo.videoId); if ( length0 - videoDocArr.length == 0 ) {throw("error createInputDataFor deleteVideoFromPlaylist")}
                this.playlistToVideoDocArr.set(playlistId, videoDocArr)
                resArr.push({playlistId:playlistId, video:removedVideo})
            }
            return resArr
        }   

        if (funcName == "createPlaylistCache") {
            //create 1 playlist for each user in state
            const resArr = []
            this.userDataArr.forEach((u) => {
                const userId = u.userid
                const result = createInputDatCreatePlaylist(userId)
                const { playlist, video } = result
                this.userIdToPlaylistArrMap[userId].push(playlist._doc._id.toString())
                this.playlists.push(result.playlist._doc)
                this.playlistToVideoDocArr.set(playlist._doc._id.toString(), [video._doc])
                console.log("this.playlistToVideoDocArr111", this.playlistToVideoDocArr)
                const vidDoc = {...video._doc}; delete vidDoc._id; delete vidDoc.playlistId; delete vidDoc.createdAt
                this.videoIdToVideoJson.set(vidDoc.videoId, vidDoc)
                resArr.push({ userid: userId, data: result })

            })


            // console.log("playlistToVideoIdsTest", this.playlistToVideoIds.get(playlist._doc._id.toString()))
            return resArr //[ { userid: userId, data: { playlist:playlist, video:video } } ]
        }

        if (funcName == "addVideoToPlaylistsCache") {
            //create a new video for each playlist
            const finalRes = []
            this.playlists.forEach((p) => {
                
                const playlistId = p._id
                // console.log("addVideoToPlaylistsCache p._id", p._id,this.playlistToVideoIds.get(playlistId),this.playlistToVideoIds[playlistId])
                const vidDocu = createVideoForPlaylist(playlistId)
                //push vidDoc with full data to finalRes so addVideoToPlaylistsCache can consume
                finalRes.push({playlistId:playlistId, video:vidDocu})
                // console.log("vidDocu", vidDocu)
                //add new vidDoc to this.playlistToVideoDocArr.get(playlistId)
                const vidDocArr = this.playlistToVideoDocArr.get(playlistId)
                vidDocArr.push(vidDocu)
                this.playlistToVideoDocArr.set(playlistId, vidDocArr)

                //modify vidDoc and add to this.videoIdToVideoJson
                const vidDoc = {...vidDocu}
                delete vidDoc.createdAt; delete vidDoc.playlistId; delete vidDoc._id
                this.videoIdToVideoJson.set(vidDoc.videoId, vidDoc)
                                
            })
            
            return finalRes
        }

    }

    returnExpectedDataFor = (funcName, data) => {
        try {

            if (funcName == "getPlaylistsOfUserFromCache") { return this.returnGetPlaylistsOfUserFromCacheData(data) }
            if (funcName == "getAllVideosOfPlaylistFromCache") { return this.returnGetAllVideosOfPlaylistFromCache(data) }

        } catch (err) {
            throw ("err returnExpectedDataFor", err)
        }

    }

    returnGetAllVideosOfPlaylistFromCache = () => {
        //from 1 playlist id, return all video objects belong to playlist id
        //return [ {playlistId:playlistId, videoArr:[videoDoc]} ]
        const finalArr = []
        // console.log("this.playlistToVideoDocArr", this.playlistToVideoDocArr)
        for (const playlistId of this.playlistToVideoDocArr.keys()) {
            const videoDocArr = this.playlistToVideoDocArr.get(playlistId)
            if (!videoDocArr) { throw ("videoDocArr isNUll error" + " " + this.playlistToVideoDocArr.keys() + " " + playlistId) }
            // console.log("playlistToVideoIds", playlistId, videoDocArr,videoResArr)
            const newobj = { playlistId: playlistId, videoArr: videoDocArr }
            finalArr.push(newobj)
        }
        //return [ {playlistId:playlistId, videoArr:[videoDoc]} ]
        console.log("finalArr", finalArr[0].videoArr)
        return finalArr
    }

    returnGetPlaylistsOfUserFromCacheData = () => {
        //return [ {userid:userid, playlistArr:[playlistDoc]} ]
        try {
            const finalArr = []
            this.userDataArr.forEach(
                (u) => {
                    const { userid } = u;
                    const playlistIdArr = this.userIdToPlaylistArrMap[userid]
                    const playlistArrRes = []
                    playlistIdArr.forEach((playlisId) => {
                        const playlists = this.playlists.filter(o => o._id == playlisId) //array of playlist objects
                        if (playlists.length > 1) { throw ("err playlists.length > 1") }; const pobj = playlists[0]; pobj._id = pobj._id.toString()
                        playlistArrRes.push(pobj)
                    })
                    finalArr.push({ userid: userid, playlistArr: playlistArrRes })
                }
            )
            return finalArr
        } catch (err) {
            throw ("err returnGetPlaylistsOfUserFromCacheData", err)
        }
    }
}


const createInputDatCreatePlaylist = (userId) => {
    const playlistName = "playlist" + getRandomInt(1, 100).toString()
    const platlistData = { userId: userId, playlistName: playlistName }
    console.log("createInputDataFor createPlaylistCache", userId, playlistName)
    const result = createInputDataForcreatePlaylistCache(platlistData) //{playlist:playlist, video:video}
    return result
}

module.exports = { DataGeneratorCP }