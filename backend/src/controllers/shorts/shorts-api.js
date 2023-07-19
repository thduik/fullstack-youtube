//  https://rapidapi.com/Glavier/api/youtube138
const axios = require('axios');
const { zachKing, mrBeast } = require('../../dev-only/popularShorts');
const { daFuqBoom } = require('../../dev-only/popularShorts2');
require('dotenv').config()

const rapidApiKey = process.env.RAPID_API_KEY
const fetchShortsOfChannelA = async ({ channelId,cursorNext }) => {
    if (!channelId) { console.log('no channelId');return}
    let paramz = {
        id: channelId,
        filter: 'shorts_latest',
        hl: 'en',
        gl: 'US'
    }
    if (cursorNext) {paramz.cursorNext = cursorNext}
    console.log("fetchShortsOfChannelA paramz is", paramz)
    const options = {
        method: 'GET',
        url: 'https://youtube138.p.rapidapi.com/channel/videos/',
        params: paramz,
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return (response.data)
    } catch (error) {
        console.error(error);
    }
}

const fetchSuggestedShorts = async({shortid, sequenceContiuation = null}) => {
    //https://rapidapi.com/ytjar/api/yt-api
    let paramz = {id: shortid}
    if (sequenceContiuation) {paramz.params = sequenceContiuation} //read docs above, Shorts Sequence session
    const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/shorts/sequence',
        params: paramz,
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          return response.data
      } catch (error) {
            //   console.error(error);
          throw(error)
      }
}


const fetchPopularShorts = async () => {
    let res = {data:[]}
    res.data.push(...daFuqBoom.data)
    res.data.push(...zachKing.data)
    res.data.push(...mrBeast.data)
    console.log(res)
    return res
}
module.exports = {fetchShortsOfChannelA, fetchSuggestedShorts, fetchPopularShorts}