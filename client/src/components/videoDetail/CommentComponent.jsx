import { useEffect, useState } from "react"
import LikeIcon from "../../icons/LikeIcon"
import { convertDateDiff } from "../../utils"
import ViewMoreRepliesButton from "./ViewMoreRepliesButton"
import { fetchCommentsOfParentThread } from "../../apiFetch/commentApi"
import ChildComment from "./ChildComment"

const CommentBox = ({ comment }) => {
    const { authorProfileImageUrl, textDisplay, authorDisplayName, publishedAt, updatedAt, likeCount, textOriginal } = comment.snippet.topLevelComment.snippet
    const {totalReplyCount, canReply, isPublic } = comment.snippet
    const {id} = comment
    const [publishDate, setPublishDate] = useState("nullDatelol")
    const [comments, setComments] = useState([])
    const [nextPageToken, setNextPageToken] = useState(false)
    useEffect(() => {
        console.log("publishedAt",publishedAt)
        const resTimeDiff = convertDateDiff(publishedAt)
        setPublishDate(resTimeDiff)
    }, [publishedAt])
    
    const clickedShowReplies = async () => {
        try {
            const res = await fetchCommentsOfParentThread({parentId:id, pageToken:nextPageToken})
            if (!res.items) {throw("clickedShowReplies err no res.items")}
            console.log("clickedShowReplies res is", res)
            const currComments = [...comments]
            setNextPageToken(res.nextPageToken)
            currComments.push(...res.items)
            setComments(currComments)
        } catch(err) {
            console.log("err clickedShowReplies", err)
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "row", height: "auto", padding: "6px", margin: "8px 0px 8px 0px" }}>
            <div style={{ height: "50px", width: "50px", padding: "5px" }}>
                <img src={authorProfileImageUrl}
                    height="40px" width="40px" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", height: "auto", width: "auto" }}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    <p style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>{authorDisplayName}</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginLeft: "16px",paddingTop:"1px" }}>{publishDate} </p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginLeft:"13px", paddingTop:"2px"}}>{publishedAt}</p>
                </div>
                <p style={{ color: "white", fontSize: "13px", marginTop: "9px", lineHeight:"1.5" }}>{textDisplay}</p>
                
                <div style={{ display: "flex", flexDirection: "row", paddingTop:"8px" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <LikeIcon/>
                        <p style={{ color: "white", fontSize: "13px", marginTop: "6px", marginLeft:"5px" }}>{likeCount}</p>
                    </div>
                </div>
                
                {
                    comments.map((c,idx)=><ChildComment snippet = {c.snippet} id={c.id} />)
                }

                <div style={{marginTop:"9px"}}>
                    { totalReplyCount > 0 && totalReplyCount > comments.length ?
                        <ViewMoreRepliesButton text = {nextPageToken ? 'More replies':`${totalReplyCount} Replies`} 
                        onClick={clickedShowReplies}
                        />
                        :null
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentBox;