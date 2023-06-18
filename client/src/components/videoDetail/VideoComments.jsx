import { useEffect, useState } from "react"
import { fetchCommentsOfVideo } from "../../apiFetch/commentApi"
import CommentBox from "./CommentComponent"


const VideoComments = ({videoId}) => {
    const [comments, setComments] = useState([])
    useEffect(()=>{
        fetchCommentsOfVideo(videoId, (res)=>{
            console.log("fetchCommentsOfVideo res is", res)
        })
    },[videoId])

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {comments.map((c)=><CommentBox comment={c} />)}
        </div>
    )
}
