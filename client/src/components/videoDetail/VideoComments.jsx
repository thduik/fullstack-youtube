import { useEffect, useState } from "react"
import { fetchCommentsOfVideoAA, fetchCommentsOfVideoBB } from "../../apiFetch/commentApi"
import CommentBox from "./CommentComponent"
import StandardRoundButton from "../StandardRoundButton"
import { CircularProgress } from "@mui/material"
import useCommentApiBB from "../../hooks/commentApiHook"



const VideoComments = ({ videoId, commentCount, marginTop = "30px" }) => {
    const [comments, buttonHook, setVideoId, setButtonHook] = useCommentApiBB()
    useEffect(()=>{
        console.log("VideoComments comments changed", comments)
    },[comments])
    useEffect(()=>{
        console.log("VideoComments setVideoID called")
        setVideoId(videoId)
    },[videoId])
    
    useEffect(()=>{
        console.log("comments useState",comments)
        
    },[comments])
    const clickedGetMoreComments = () => {
        if (buttonHook) { return }
        setButtonHook(true)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: marginTop }}>
            <div>
                <p style={{ color: "white", fontSize: "14px", marginBottom: "14px" }}>{commentCount} comments</p>
            </div>
            {comments.map((c, idx) => <CommentBox key={idx} comment={c} videoId={videoId} />)}
            <div style={{width:"80%", margin:"auto", backgroundColor:"none"}}>
                {buttonHook ?
                <div style={{width:"60px", margin:"auto", padding:"auto"}}> <CircularProgress/> </div> 
                :
                <StandardRoundButton width={"100%"} hoverBColor={"rgba(62, 166, 255, 0.5)"} 
                mouseDownBColor="rgba(255, 255, 255, 0.2)" textColor="rgba(62, 166, 255, 1)"
                text={"Load more comments"} border="1px solid rgba(255,255,255,0.5)"
                    onClick={clickedGetMoreComments} />
                }
            </div>
        </div>
    )
}

export default VideoComments;
