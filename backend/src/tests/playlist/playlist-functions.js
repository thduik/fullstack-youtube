const Playlist = require('../../models/Playlist')
const axios = require('axios')
const { mockUserId, mockPlaylistName } = require('../data')
const connectDB = require('../../db/connect-db')
const request = require("supertest")

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
        videoUrl: 'https://www.youtube.com/watch?v=YJTae5ScvQA&list=PLx7eKxY49wZLuWE-onXJH_qqyCPGHpTcJ&index=5',
        videoName: 'Distrion & Electro-Light - Drakkar [NCS Release]',
        thumbnailUrl: 'https://i.ytimg.com/vi/YJTae5ScvQA/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhAIF8oZTAP&rs=AOn4CLAjKXBADPj9RjLfdyWvTZGREiwh7w',
        createdAt: Date.now()
    }
]

const testGetPlaylist = async () => {
    const getUrl = baseUrl + '/playlist'
    const res = await axios.get(getUrl)
    console.log("testGetPlaylist success playlists are", res.data.playlists[0].videoArray)
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
            videoArray:videoDataArr,
            isPrivate:false
        }
    })
    console.log("testPostAxios success docid is", res.data)
    return res.data
}

const testUpdatePlaylist = async () => {
    const createUrl = baseUrl + '/playlist/update'
    const res = await axios.post(createUrl,
        {
        playlist: {
            playlistName:mockPlaylistName,
            userid:mockUserId,
            userName:mockUsername,
            videoArray:videoDataArr,
            isPrivate:false
        }
    })
    console.log("testPostAxios success docid is", res.data)
    return res.data
}

module.exports = {testCreatePlaylistWithError,videoDataArr, 
    testPostAxios, testGetPlaylist, testUpdatePlaylist}