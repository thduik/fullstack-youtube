import axios from 'axios'

export const fetchPopularVideos = async (pageToken = false, callback) => {
    const baseUrl = import.meta.env.VITE_BASE_API_URL
    console.log("fetchPopularVideos called", pageToken)

    try {
        var searchUrl = baseUrl + `/youtube/videos/popular?regionCode=VN`
        if (pageToken) { searchUrl += `&nextPageToken=${pageToken}`}
        console.log("popularUrl", searchUrl, "pageTOken", pageToken)
        const res = await axios.get(searchUrl)
        console.log("videoData is",res.data.items[0])
        const arros = res.data.items.map(o=>{
            const newO = {...o};
            newO.id =  {kind:"youtube#video", videoId:o.id}
            newO.thumbnails.default.url = `https://i.ytimg.com/vi/${o.id}/hqdefault.jpg`
            newO.thumbnails.medium.url = `https://i.ytimg.com/vi/${o.id}/hqdefault.jpg`
            newO.thumbnails.high.url = `https://i.ytimg.com/vi/${o.id}/hqdefault.jpg`
            return newO
          })
        callback(arros)
        return 
    } catch (err) {
        throw("searchVideosFromApiYoutube err", err)
    }
}