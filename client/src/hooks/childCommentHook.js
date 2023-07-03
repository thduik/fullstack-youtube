import { useEffect, useState } from "react"
import { fetchCommentsOfParentThreadBB } from "../apiFetch/commentApi"

const useChildComment = () => {
    const [videoId, setVideoId] = useState(null)
    const [replyToken, setReplyToken] = useState(false)
    const [nextPageToken, setNextPageToken] = useState(null)
    const [comments, setComments] = useState([])
    const [buttonActive, setButtonActive] = useState(false)
    const [commentData, setCommentData] = useState([null, null]) //{replyToken, nextPageToken, videoId}
    useEffect(() => {

        const [replyToken, videoId] = commentData
        if (!replyToken) { return }
        // console.log("useChildComment", replyToken, videoId, commentData)
        setReplyToken(replyToken)
        setVideoId(videoId)
    }, [commentData])
    useEffect(() => {
        console.log("useChildComment replyToken changed", replyToken)
    }, [replyToken])
    useEffect(() => {
        if (!buttonActive) { return }
        fetchCommentsOfParentThreadBB({ videoId: videoId, replyToken: nextPageToken ? nextPageToken : replyToken }, (res) => {
            console.log("useEffect childComment", replyToken)
            console.log("clickedShowReplies res is", res)
            const currComments = [...comments]
            setNextPageToken(res.continuation)
            currComments.push(...res.data)
            // currComments.push(...res.data)
            setComments(currComments)
            setButtonActive(false)
        })


        // fetchAndSet()

    }, [buttonActive])


    return [comments, nextPageToken, buttonActive, setButtonActive, setCommentData]

}

export default useChildComment;