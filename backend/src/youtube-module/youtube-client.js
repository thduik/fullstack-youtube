const {google} = require('googleapis');
const path = require('path');
const axios = require('axios')
require('dotenv').config()

const searchVideosWithKeyword = async (keyword = "surfing", resultType = "video", pageToken=false) => {
  //resultType can be "channel", "playlist" or "video"
  try {
    const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${keyword}&key=${process.env.YOUTUBE_API_KEY}`
    if (pageToken) { searchUrl += `&pageToken=${pageToken}` }
      const res = await axios.get(searchUrl
          , {}, {
          headers: {
              // Authorization: 'Bearer ' + token,
              Accept: 'application/json'
          }
      }
      )
      return res.data

  } catch (err) {
      throw ("err testSearchYoutube", err)
  }

}
  
  module.exports = {searchVideosWithKeyword};