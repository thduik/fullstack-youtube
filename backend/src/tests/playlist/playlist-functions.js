const Playlist = require('../../models/Playlist')
const axios = require('axios')
const { mockUserId, mockPlaylistName, mockUsername } = require('../data')
const connectDB = require('../../db/connect-db')
const request = require("supertest")

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
        console.log("testCreatePlaylist success docid is", response.body)
        return response
    } catch (err) {
        throw('testCreatePlaylistWithError', err)
    }
}

const videoDataArr = [
    {
        videoId: 'YJTae5ScvQA',
        videoName: 'Distrion & Electro-Light - Drakkar [NCS Release]',
        thumbnailUrl: 'https://i.ytimg.com/vi/YJTae5ScvQA/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhAIF8oZTAP&rs=AOn4CLAjKXBADPj9RjLfdyWvTZGREiwh7w',
        createdAt: Date.now()
    }
]

const testGetPlaylist = async () => {
    //return array of playlist objects
    const getUrl = baseUrl + '/playlist'
    const res = await axios.get(getUrl)
    console.log("testGetPlaylist success playlists are", res.data.playlists)
    return res.data
}

const testPostAxios = async () => {
    const createUrl = baseUrl + '/playlist/create'
    const res = await axios.post(createUrl,
        {
        playlist: {
            playlistName:mockPlaylistName,
            userid:mockUserId,
            userName:mockUsername,
            isPrivate:false
        },
        videoInfo: videoDataArr[0]
        //{videoId,videoName,thumbnailUrl,createdAt}
        
    })
    console.log("testPostAxios success docid is", res.data)
    return res.data
}

const testUpdatePlaylist = async (videoData, playlistId) => {
    videoData.playlistid = playlistId
    const createUrl = baseUrl + '/playlist/update'
    const res = await axios.post(createUrl,
        {
        videoData: videoData,
        playlistid:playlistId
    })
    console.log("testPostAxios success docid is", res.data)
    return res.data
}

const setupTest = async () => {
    await connectDB()
}

const cleanupTest = async () => {
    try {
        await Playlist.deleteMany({userid:mockUserId})
    } catch (err) {
        throw("cleanupTest error", err)
    }
   
}

module.exports = {testCreatePlaylistWithError,videoDataArr, 
    testPostAxios, testGetPlaylist, testUpdatePlaylist, setupTest, cleanupTest}