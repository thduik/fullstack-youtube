import axios from 'axios'
import { processResData } from './utils'
const baseUrl = 'https://holysheet2831.hopto.org/api'

export const fetchCommentsOfVideo = async (videoId, callback) => {
    console.log("fetchCommentsOfVideo called", videoId)
    try {
        const getUrl = baseUrl + `/comment/threads/video/${videoId}`
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfVideo success comments are", res.data)
        callback(res.data)
        return
    } catch (err) {
        console.log("err fetchCommentsOfVideo", err)
        return
    }
}