import axios from 'axios'
import { baseApiUrl } from '../configs';

export const fetchShortsOfChannel = async ({channelId, cursorNext}, callback) => {
    if (!channelId) {console.log("fetchShortsOfChannel no channelId");return}
    const baseUrl = import.meta.env.VITE_BASE_API_URL
    // console.log("fetchShortsOfChannel called channelId, cursorNext", channelId, cursorNext)

    try {
        var searchUrl = baseApiUrl + `/youtube/channel/shorts?channelid=${channelId}`
        if (cursorNext) { searchUrl += `&cursorNext=${cursorNext}`}
        const res = await axios.get(searchUrl)
        // console.log(res.data)
        return callback(res.data)
         
    } catch (err) {
        console.log("errfetchShortsOfChannel ", err)
    }
}