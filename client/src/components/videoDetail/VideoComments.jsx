import { useEffect, useState } from "react"
import { fetchCommentsOfVideo } from "../../apiFetch/commentApi"
import CommentBox from "./CommentComponent"


const VideoComments = ({videoId, commentCount, marginTop = "30px"}) => {
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
        <div style={{display:"flex", flexDirection:"column", marginTop:marginTop}}>
            <div>
                <p style={{color:"white", fontSize:"14px"}}>{commentCount} comments</p>
            </div>
            {comments.map((c)=><CommentBox comment={c} />)}
        </div>
    )
}

export default VideoComments;
