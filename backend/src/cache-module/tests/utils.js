var ObjectID = require("bson-objectid");
const { generateRandomString } = require("../../utils/strings/generateRandomString")


function getRandomInt(min, max) {//generate random int between min and max (inclusive, example if 0 and 4 result will include 4)
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createInputDataForcreatePlaylistCache = ({ userId, playlistName }) => {
  //create playlist + fir st video input data
  //mock input data must respect true input data from dataManager
  const newPlaylistId = new ObjectID()
  const playlist = {
      playlistName: playlistName,
      userid: userId,
      thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
      isPrivate: true,
      isUnlisted: false,
      createdAt: Date.now() + getRandomInt(1, 10000000),
      count: 1,
      _id: newPlaylistId.toString(),
      // __v: 0
  }
  const video = createVideoForPlaylist(newPlaylistId.toString())
  return { playlist: { _doc: playlist }, video: { _doc: video }, userId: userId }
}

const createVideoForPlaylist = (playlistId) => {
  const videoIdString = generateRandomString("5Hnico_qSUc".length)
  const vidID = new ObjectID()
  const video = {
      playlistId: playlistId,
      videoName: 'VideoName' + getRandomInt(1, 100000).toString(),
      videoId: videoIdString,
      thumbnailUrl: 'https://i.ytimg.com/vi/MXBCMgq7_xY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCkgbA5Yu_qQ59vBNraknj2139L0w',
      channelName:"channel" + getRandomInt(1, 10000).toString(),
      createdAt: Date.now() + getRandomInt(1, 10000000),
      _id: vidID.toString(),
      // __v: 0
  }
  return video
}

function objectEqual(object1, object2) {
    //console.log("objectEqual", object1, object2)
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);

      if (!areObjects && val1 !== val2) {
        throw("objectEqual failed key is" + key)
      }
      if (
        areObjects && !objectEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
  
    return true;
  }
  
  function isObject(object) {
    return object != null && typeof object === 'object';
  }

  module.exports = {objectEqual, createInputDataForcreatePlaylistCache, createVideoForPlaylist,getRandomInt}