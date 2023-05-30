const {google} = require('googleapis');
const path = require('path');
const axios = require('axios')
require('dotenv').config()

const searchVideosWithKeyword = async (keyword = "surfing", resultType = "video") => {
  //resultType can be "channel", "playlist" or "video"
  try {
      console.log("process.env.YOUTUBE_API_KEY", process.env.YOUTUBE_API_KEY)
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${keyword}&key=${process.env.YOUTUBE_API_KEY}`
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