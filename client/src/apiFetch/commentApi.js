import axios from 'axios'
import { processResData } from './utils'
import { baseApiUrl } from '../configs'


export const fetchCommentsOfVideoAA = async ({ videoId = null, pageToken = false }, callback) => {
    if (!videoId) { console.log("fetchCommentsOfVideoAA videoID null"); return }
    var getUrl = baseApiUrl + `/comment/threads/video/${videoId}`
    if (pageToken) { getUrl += `?pageToken=${pageToken}` }
    console.log("fetchCommentsOfVideoAA called", videoId, pageToken, "getUrl", getUrl)

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

export const fetchCommentsOfVideoBB = async ({ videoId, pageToken = false }, callback) => {
    if (!videoId) { console.log("fetchCommentsOfVideoBB videoID null"); return }

    var getUrl = baseApiUrl + `/comment/threads/video/${videoId}`
    if (pageToken) { getUrl += `?pageToken=${pageToken}` }
    console.log("fetchCommentsOfVideoBB called", videoId, pageToken, "getUrl", getUrl)

    try {
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfVideoBB success comments are", getUrl, res.data)
        const parsedData = parseCommentBBData(res.data)
        console.log("parseCommentBBData finished", parsedData)
        callback(parsedData)
        return
    } catch (err) {
        console.log("err fetchCommentsOfVideo", err)
        return
    }
}

export const fetchCommentsOfParentThread = async ({ parentId, pageToken = false }) => {
    var getUrl = baseApiUrl + `/comment/parent?parentid=${parentId}`
    if (pageToken) { getUrl += `?pageToken=${pageToken}` }
    console.log("fetchCommentsOfVideo called", parentId, pageToken, "getUrl", getUrl)

    try {
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfVideo success comments are", getUrl, res.data)
        return (res.data)

    } catch (err) {
        console.log("err fetchCommentsOfVideo", err)
        return
    }
}

export const fetchCommentsOfParentThreadBB = async ({ videoId, replyToken },callback) => {
    var getUrl = baseApiUrl + `/comment/parent/b?videoId=${videoId}&replyToken=${replyToken}`
    console.log("fetchCommentsOfParentThreadBB called", videoId, replyToken, "getUrl", getUrl)

    try {
        const res = await axios.get(getUrl)
        console.log("fetchCommentsOfParentThreadBB success childComments are", getUrl, res.data)
        // return (res.data)
        callback(res.data)

    } catch (err) {
        console.log("err fetchCommentsOfParentThreadBB", err)
        return
    }
}


const parseCommentBBData = (resData) => {
    // console.log("parseCommentBBData called", resData, "resData.data", resData.data)
    const result = {}

    const newCommentArr = resData.data.map(originalCom => {
        const commentObj = { snippet: {} }
        const topLevelCom = {
            snippet: {
                authorProfileImageUrl: originalCom.authorThumbnail[0].url,
                authorText: originalCom.authorText,
                authorDisplayName: originalCom.authorDisplayName,
                publishedAt: originalCom.publishedTimeText,
                channelId: originalCom.authorChannelId,
                //updatedAt:
                likeCount: originalCom.likesCount,
                textDisplay: originalCom.textDisplay
                //textOriginal

            }
        }
        commentObj.snippet = {
            topLevelComment: topLevelCom,
            totalReplyCount : originalCom.replyCount,
            replyToken: originalCom.replyToken,
            canReply : true,
            isPublic : true,
            id : originalCom.commentId
        }

        return commentObj
    })
    result.items = newCommentArr
    result.nextPageToken = resData.continuation
    return result

}