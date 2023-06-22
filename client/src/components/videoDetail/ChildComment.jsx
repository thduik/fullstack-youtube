import { useState, useEffect } from "react"
import { convertDateDiff } from "../../utils"
import LikeIcon from "../../icons/LikeIcon"

const ChildComment = ({snippet, id}) => {
    const { authorProfileImageUrl, textDisplay, authorDisplayName, publishedAt, updatedAt, likeCount, textOriginal } = snippet
    const [publishDate, setPublishDate] = useState("nullDatelol")
    useEffect(() => {
        console.log("publishedAt",publishedAt)
        const resTimeDiff = convertDateDiff(publishedAt)
        setPublishDate(resTimeDiff)
    }, [publishedAt])
    return (
        <div style={{ display: "flex", flexDirection: "row", height: "auto", padding: "6px", margin: "8px 0px 8px 0px" }}>
            <div style={{ height: "40px", width: "40px", padding: "5px" }}>
                <img src={authorProfileImageUrl}
                    height="30px" width="30px" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", height: "auto", width: "auto" }}>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    <p style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>{authorDisplayName}</p>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginLeft: "16px",paddingTop:"1px" }}>{publishDate} </p>
                </div>
                <p style={{ color: "white", fontSize: "13px", marginTop: "9px", lineHeight:"1.5" }}>{textDisplay}</p>
                
                <div style={{ display: "flex", flexDirection: "row", paddingTop:"8px" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <LikeIcon/>
                        <p style={{ color: "white", fontSize: "13px", marginTop: "6px", marginLeft:"5px" }}>{likeCount}</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ChildComment