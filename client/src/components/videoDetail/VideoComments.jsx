import { useEffect, useState } from "react"
import { fetchCommentsOfVideo } from "../../apiFetch/commentApi"
import CommentBox from "./CommentComponent"
import StandardRoundButton from "../StandardRoundButton"


const VideoComments = ({ videoId, commentCount, marginTop = "30px" }) => {
    const [comments, setComments] = useState([])
    const [nextPageToken, setNextPageToken] = useState(false)
    useEffect(() => {
        fetchCommentsOfVideo({ videoId: videoId }, (res) => {
            console.log("fetchCommentsOfVideo res is", res)
            if (!res) { console.log("err no res VideoComments"); return }
            setComments(res?.items)
            setNextPageToken(res?.nextPageToken)
        })

    }, [videoId])
    useEffect(()=>{
        console.log("comments useState",comments)
        
    },[comments])
    const clickedLoadMoreComments = (pageToken) => {
        fetchCommentsOfVideo({ videoId: videoId, pageToken: pageToken }, (res) => {
            //console.log("clickedLoadMoreComments res is", res)
            const commentArr = comments
            if (res && res.items ) { 
                console.log("clickedLoadMoreComments res is", res)
                commentArr.push(...res.items)
                settos(commentArr)
             }
        })
    }

    const settos = (commentArr) => {
        console.log("settos called")
        setComments(commentArr)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: marginTop }}>
            <div>
                <p style={{ color: "white", fontSize: "14px", marginBottom: "14px" }}>{commentCount} comments</p>
            </div>
            {comments.map((c, idx) => <CommentBox key={idx} comment={c} />)}
            <div style={{width:"80%", margin:"auto", backgroundColor:"none"}}>
                <StandardRoundButton width={"100%"} hoverBColor={"rgba(62, 166, 255, 0.5)"} 
                mouseDownBColor="rgba(255, 255, 255, 0.2)" textColor="rgba(62, 166, 255, 1)"
                text={"Load more comments"}
                    onClick={() => { clickedLoadMoreComments(nextPageToken) }} />
            </div>
        </div>
    )
}

export default VideoComments;
