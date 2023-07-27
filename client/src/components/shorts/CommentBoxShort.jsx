import { useEffect, useState } from "react"
import LikeIcon from "../../icons/LikeIcon"
import { convertDateDiff } from "../../utils"
import ViewMoreRepliesButton from "./ViewMoreRepliesButton"
import { fetchCommentsOfParentThread, fetchCommentsOfParentThreadBB } from "../../apiFetch/commentApi"
import ChildComment from "./ChildComment"
import useChildComment from "../../hooks/childCommentHook"
// import Loader from "../Loader"
import { CircularProgress } from "@mui/material"
import ChildCommentB from "./ChildCommentB"


const CommentBoxShort = ({ videoId, comment }) => { //comment here is the parent comment
    const { authorProfileImageUrl, textDisplay, authorDisplayName, publishedAt, updatedAt, likeCount, textOriginal } = comment
    const { totalReplyCount, canReply, isPublic, replyToken } = comment
    // const {totalReplyCount, canReply, isPublic } = comment
    const [publishDate, setPublishDate] = useState("nullDatelol")

    const [comments, nextPageToken,buttonActive, setButtonActive, setCommentData] = useChildComment()
    useEffect(() => {
        //do not use below function when using fetchCommentsOfVideoBB,  use when using fetchCommentsOfVideoAA
        // const resTimeDiff = convertDateDiff(publishedAt);setPublishDate(resTimeDiff)
        setPublishDate(publishedAt)
    }, [publishedAt])
    useEffect(() => {
        if (!replyToken || !videoId) { console.log("noReplyToken"); return }
        console.log("useEffectreplyToken", replyToken)
        setCommentData([replyToken, videoId])
    }, [videoId, replyToken])

    const clickedShowReplies = () => {
        if (buttonActive) { return }
        setButtonActive(true)
    }
    return (
        <div style={{ display: "flex", flexDirection: "row", height: "auto", padding: "6px", margin: "8px 0px 8px 0px" }}>
            <div style={{ height: "50px", width: "50px", padding: "5px" }}>
                <img src={ authorProfileImageUrl }
                    height="40px" width="40px" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", height: "auto", width: "auto" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>{authorDisplayName}</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginLeft: "16px", paddingTop: "1px" }}>{publishDate} </p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginLeft: "13px", paddingTop: "2px" }}>{publishedAt}</p>
                </div>
                <p style={{ color: "white", fontSize: "13px", marginTop: "9px", lineHeight: "1.5" }}>{textDisplay}</p>

                <div style={{ display: "flex", flexDirection: "row", paddingTop: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <LikeIcon />
                        <p style={{ color: "white", fontSize: "13px", marginTop: "6px", marginLeft: "5px" }}>{likeCount}</p>
                    </div>
                </div>

                {
                    // comments.map((c, idx) => <ChildComment snippet={c.snippet} id={c.id} />)
                    comments.map((c, idx) => <ChildCommentB snippet={c} id={c.commentId} />)
                }

                <div style={{ marginTop: "9px" }}>

                    {   buttonActive ? <div style={{height:"24px",width:"24px"}}> <CircularProgress size="24px" /> </div> :

                        (totalReplyCount > 0 && totalReplyCount > comments.length ?
                            <ViewMoreRepliesButton text={nextPageToken ? 'More replies' : `${totalReplyCount} Replies`}
                                onClick={clickedShowReplies}
                            />
                            : null)
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentBoxShort;