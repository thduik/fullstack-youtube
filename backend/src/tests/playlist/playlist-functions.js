const Playlist = require('../../models/Playlist')
const PlaylistVideoInfo = require('../../models/PlaylistVideoInfo')

const axios = require('axios')
const { mockUserId, mockPlaylistName, mockUsername } = require('../data')
const connectDB = require('../../db/connect-db')
const request = require("supertest")
var ObjectID = require("bson-objectid");

const baseUrl = 'http://localhost:4444/test'

const testCreatePlaylistWithError = async () => {
    //videoArray is missing
    try {
        const newPlaylist = {

            isPrivate: false
        }
        const createUrl = baseUrl + '/playlist/create'
        const response = await request(createUrl).post("/").send(
            { playlist: newPlaylist }
        );
        // console.log("testCreatePlaylist success docid is", response.body)
        return response
    } catch (err) {
        throw ('testCreatePlaylistWithError', err)
    }
}

const videoDataArr = [
    {
        videoId: 'YJTae5ScvQA',
        videoName: 'Video 1 - Distrion & Electro-Light - Drakkar [NCS Release]',
        thumbnailUrl: 'https://i.ytimg.com/vi/YJTae5ScvQA/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhAIF8oZTAP&rs=AOn4CLAjKXBADPj9RjLfdyWvTZGREiwh7w',
        createdAt: Date.now()
    },
    {
        videoId: 'i3vrmI_7zq4',
        videoName: 'Video 2 - Devon Larrat New!! ANTI FLOP PRESS TRAINING',
        thumbnailUrl: 'https://i.ytimg.com/vi/i3vrmI_7zq4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCh3L6QqUk-yoM4OP_9nHNDvbZAYg',
        createdAt: Date.now()

    },
    {
        videoId: 'i3vrmI_7zq4',
        videoName: 'Video 3 - Devon Larrat New!! ANTI FLOP PRESS TRAINING',
        thumbnailUrl: 'https://i.ytimg.com/vi/i3vrmI_7zq4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCh3L6QqUk-yoM4OP_9nHNDvbZAYg',
        createdAt: Date.now()

    }
]

const testGetPlaylist = async () => {
    //return array of playlist objects
    const getUrl = baseUrl + '/playlist'
    const res = await axios.get(getUrl)
    // console.log("testGetPlaylist success playlists are", res.data.playlists)
    return res.data.playlists
}

const testCreatePlaylist = async () => {
    const createUrl = baseUrl + '/playlist/create'
    const res = await axios.post(createUrl,
        {
            playlist: {
                _id:ObjectID().toHexString(),
                playlistName: mockPlaylistName,
                userid: mockUserId,
                creatorName: mockUsername,
                isPrivate: false

            },
            videoInfo: videoDataArr[0]
            //{videoId,videoName,thumbnailUrl,createdAt}

        })
    // console.log("testPostAxios success docid is", res.data)
    return res.data
}

const testUpdatePlaylist = async (videoData, playlistId) => {
    videoData.playlistid = playlistId
    const createUrl = baseUrl + '/playlist/update'
    const res = await axios.post(createUrl,
        {
            videoData: videoData,
            playlistid: playlistId
        })
    // console.log("testPostAxios success docid is", res.data)
    return res.data
}

const testGetVideosOfPlaylist = async (playlist) => {
    try {
        const playlistid = playlist._id
        const getUrl = baseUrl + `/playlist/${playlistid}/videos`
        const res = await axios.get(getUrl)
        // console.log("testGetVideosOfPlaylist success videos are", res.data.videos)
        return res.data.videos
    } catch (err) {
        throw ("testGetVideosOfPlaylist", err)
    }
}

const testAddVideoToPlaylist = async (playlistData, videoData) => {

    const playlistid = playlistData._id
    const updateUrl = baseUrl + `/playlist/update/${playlistid}`
    const res = await axios.post(updateUrl,
        {
            videoData: videoData,
            playlistid: playlistid,
            playlistData: playlistData
        })
    // console.log("testPostAxios success docid is", res.data)
    return res.data

}

const testDeleteVideoFromPlaylist = async (playlistData, videoData, videoOrderIndex) => {
    //videoOrderIndex = index of videoOrder in array
    //because only user can edit playlist, we can assume server-stored playlist videos same as client-stored videos
    const playlistid = playlistData._id
    const updateUrl = baseUrl + `/playlist/${playlistid}/videos/delete`
    const res = await axios.post(updateUrl,
        {
            video: videoData,
            playlistid: playlistid,
            playlistData: playlistData,
            videoOrderIndex: videoOrderIndex
        })
    // console.log("testPostAxios success docid is", res.data)
    return res.data

}


const setupTest = async () => {
    await connectDB()
}

const cleanupTest = async () => {
    try {
        await Playlist.deleteMany({ userid: mockUserId })
        const videoIds = videoDataArr.map(obj => obj.videoId)
        // console.log("cleanupTest videoId are", videoIds)
        PlaylistVideoInfo.deleteMany({ videoId: { $in: videoIds } })
    } catch (err) {
        throw ("cleanupTest error", err)
    }

}

module.exports = {
    testCreatePlaylistWithError, videoDataArr,
    testCreatePlaylist, testGetPlaylist, testUpdatePlaylist, setupTest, cleanupTest,
    testAddVideoToPlaylist, testGetVideosOfPlaylist, testDeleteVideoFromPlaylist
}