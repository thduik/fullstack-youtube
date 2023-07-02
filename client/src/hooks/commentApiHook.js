import { useEffect, useState } from "react"
import { fetchCommentsOfVideoBB } from "../apiFetch/commentApi"

const useCommentApiBB = () => {
    const [videoId, setVideoId] = useState(null)
    const [nextPageToken, setNextPageToken] = useState(false)
    const [comments, setComments] = useState([])
    const [buttonHook, setButtonHook] = useState(false)

    useEffect(() => {
        // fetchCommentsOfVideo({ videoId: videoId }, (res) => {
        fetchCommentsOfVideoBB({ videoId: videoId }, (res) => {
            console.log("fetchCommentsOfVideo res is", res)
            if (!res) { console.log("err no res VideoComments"); return }
            setComments(res?.items)
            setNextPageToken(res?.nextPageToken)
        })

    }, [videoId])

    useEffect(() => {
        if (!buttonHook) { return }
    
        fetchCommentsOfVideoBB({ videoId: videoId, pageToken: nextPageToken }, (res) => {
            var commentArr = comments
            if ( res && res.items ) { 
                commentArr.push(...res.items)
                console.log("clickedLoadMoreComments res is", commentArr)
                setNextPageToken(res.nextPageToken)
                setComments(commentArr)
                
             }
            setButtonHook(false)
        })

    }, [buttonHook])

    return [comments, buttonHook, setVideoId, setButtonHook]
}

export default useCommentApiBB;