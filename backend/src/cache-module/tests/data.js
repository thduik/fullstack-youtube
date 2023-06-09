var ObjectID = require("bson-objectid");
const { generateRandomString } = require("../../utils/strings/generateRandomString")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
        this.playlistToVideoIds = new Map() // { playlist_id : [videoIds] }
        this.videoIdToVideoJson = new Map() // { videoId:{videoJson} }
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

        if (funcName == "createPlaylistCache") {
            //create 1 playlist for each user in state
            const resArr = []
            this.userDataArr.forEach((u) => {
                const userId = u.userid
                const result = createInputDatCreatePlaylist(userId)
                const { playlist, video } = result
                this.userIdToPlaylistArrMap[userId].push(playlist._doc._id.toString())
                this.playlists.push(result.playlist._doc)
                this.playlistToVideoIds.set(playlist._doc._id.toString(), [video._doc.videoId])
                this.videoIdToVideoJson.set(video._doc.videoId, video._doc)

                resArr.push({ userid: userId, data: result })

            })


            // console.log("playlistToVideoIdsTest", this.playlistToVideoIds.get(playlist._doc._id.toString()))
            return resArr
        }

        if (funcName == "addVideoToPlaylistsCache") {
            //create a new video for each playlist
            this.playlists.forEach((p) => {
                console.log("addVideoToPlaylistsCache p._id", p._id)
            })
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
        // console.log("returnGetAllVideosOfPlaylistFromCache called", data)

        this.playlistToVideoIds.forEach((playlistId) => {
            //return [ {playlistId:playlistId, videoArr:[videoDoc]} ]
            const finalArr = []
            const videoIdArr = this.playlistToVideoIds.get(playlistId)
            if (!videoIdArr) { throw ("videoIdArr isNUll error" + " " + this.playlistToVideoIds.keys()[0] + " " + playlistId) }
            const videoResArr = []
            for (var i = 0; i < videoIdArr.length; i++) {
                const videoRes = this.videoIdToVideoJson.get(videoIdArr[i])
                if (!videoRes) { throw ("returnGetAllVideosOfPlaylistFromCache err videoRes null") }
                videoResArr.push(videoRes)
            }
            finalArr.push({playlistId:playlistId, videoArr:videoResArr})
        }

        )

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
                    finalArr.push( { userid: userid, playlistArr: playlistArrRes } )
                }
            )
            return finalArr
        } catch (err) {
            throw ("err returnGetPlaylistsOfUserFromCacheData", err)
        }
    }


}






const createInputDataForcreatePlaylistCache = ({ userId, playlistName }) => {
    //create playlist + first video input data
    //mock input data must respect true input data from dataManager
    const newPlaylistId = new ObjectID()
    const playlist = {
        playlistName: playlistName,
        userid: userId,
        thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
        isPrivate: true,
        isUnlisted: false,
        createdAt: Date.now() + getRandomInt(1, 1000),
        count: 1,
        _id: newPlaylistId,
        // __v: 0
    }

    const video = createVideoForPlaylist(newPlaylistId.toString())

    return { playlist: { _doc: playlist }, video: { _doc: video }, userId: userId }
}

const createVideoForPlaylist = (playlistId) => {
    const videoIdString = generateRandomString("64816588ede41e56207671be".length)
    const video = {
        playlistId: playlistId,
        videoName: 'VideoName' + getRandomInt(1, 10000).toString(),
        videoId: '5Hnico_qSUc',
        thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
        createdAt: Date.now() + + getRandomInt(1, 1000),
        _id: new ObjectID(),
        // __v: 0
    }
    return video
}

const createInputDatCreatePlaylist = (userId) => {
    const playlistName = "playlist" + getRandomInt(1, 100).toString()
    const platlistData = { userId: userId, playlistName: playlistName }
    console.log("createInputDataFor createPlaylistCache", userId, playlistName)
    const result = createInputDataForcreatePlaylistCache(platlistData) //{playlist:playlist, video:video}
    return result
}

module.exports = { DataGeneratorCP }