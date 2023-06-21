import axios from 'axios'
import { processResData } from './utils'
const baseUrl = 'https://holysheet2831.hopto.org/api'

export const fetchCommentsOfVideo = async ({videoId, pageToken = false}, callback) => {
    console.log("fetchCommentsOfVideo called", videoId)
    try {
        var getUrl = baseUrl + `/comment/threads/video/${videoId}`
        if (pageToken) {getUrl += `?pageToken=${pageToken}`}
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfVideo success comments are", res.data)
        callback(res.data)
        return
    } catch (err) {
        console.log("err fetchCommentsOfVideo", err)
        return
    }
}