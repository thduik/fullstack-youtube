import axios from 'axios'
import { processResData } from './utils'
const baseUrl = 'https://holysheet2831.hopto.org/api'

export const fetchCommentsOfVideo = async ({videoId, pageToken = false}, callback) => {
    var getUrl = baseUrl + `/comment/threads/video/${videoId}`
    if (pageToken) {getUrl += `?pageToken=${pageToken}`}
    console.log("fetchCommentsOfVideo called", videoId, pageToken, "getUrl",getUrl)

    try {
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfVideo success comments are", getUrl, res.data)
        callback(res.data)
        return
    } catch (err) {
        console.log("err fetchCommentsOfVideo", err)
        return
    }
}

export const fetchCommentsOfParentThread = async ({parentId, pageToken=false}) => {
    var getUrl = baseUrl + `/parent?parentid=${parentId}`
    if (pageToken) {getUrl += `?pageToken=${pageToken}`}
    console.log("fetchCommentsOfVideo called", videoId, pageToken, "getUrl",getUrl)

    try {
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfVideo success comments are", getUrl, res.data)
        callback(res.data)
        return
    } catch (err) {
        console.log("err fetchCommentsOfVideo", err)
        return
    }
}