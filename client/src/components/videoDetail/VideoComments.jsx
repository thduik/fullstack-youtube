import { useEffect, useState } from "react"
import { fetchCommentsOfVideo } from "../../apiFetch/commentApi"
import CommentBox from "./CommentComponent"


const VideoComments = ({videoId}) => {
    const [comments, setComments] = useState([])
    const [nextPageToken, setNextPageToken] = useState(false)
    useEffect(()=>{
        fetchCommentsOfVideo(videoId, (res)=>{
            console.log("fetchCommentsOfVideo res is", res)
            if (!res) {console.log("err no res VideoComments"); return}
            setComments(res?.items)
            setNextPageToken(res?.nextPageToken)
        })
        
    },[videoId])

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {comments.map((c)=><CommentBox comment={c} />)}
        </div>
    )
}

export default VideoComments;
