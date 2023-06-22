import axios from 'axios'

export const fetchShortsOfChannel = async ({channelId, cursorNext}) => {
    if (!channelId) {console.log("fetchShortsOfChannel no channelId");return}
    const baseUrl = import.meta.env.VITE_BASE_API_URL
    console.log("fetchShortsOfChannel called channelId, cursorNext", channelId, cursorNext)

    try {
        var searchUrl = baseUrl + `/youtube/channel/shorts?channelid=${channelId}`
        if (pageToken) { searchUrl += `&nextPageToken=${pageToken}`}
        const res = await axios.get(searchUrl)
        return res
    } catch (err) {
        console.log("errfetchShortsOfChannel ", err)
    }
}