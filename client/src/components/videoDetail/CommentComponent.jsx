import { useEffect, useState } from "react"
import LikeIcon from "../../icons/LikeIcon"

const CommentBox = ({ comment }) => {
    const { authorProfileImageUrl, textDisplay, authorDisplayName, publishedAt, updatedAt, likeCount, textOriginal } = comment.snippet.topLevelComment.snippet
    const [publishDate, setPublishDate] = useState("nullDatelol")
    useEffect(() => {
        console.log("publishedAt",publishedAt)
        const resTimeDiff = convertDateDiff(publishedAt)
        setPublishDate(resTimeDiff)
    }, [publishedAt])
    const convertDateDiff = (dateIso) => { //dateIso = publishedAt, 
        //find difference between Date.now and published at, 
        //published less than 24 hours ago, show hours ago. less than 7 days, show days ago. less than 30 days, show weeks ago. less than 365 days. show months ago.

        const timeDiffSec = (Date.now() - Date.parse(dateIso)) / 1000
        if (timeDiffSec < 60) { return "Just now" }
        if (timeDiffSec < 3600) { return `${Math.round(timeDiffSec / 60 * 100)/100} minutes ago` }
        const timeDiffHours = timeDiffSec / 3600
        if (timeDiffHours < 24) { return `${Math.round(timeDiffHours * 100)/100} hours ago` }
        const timeDiffDays = timeDiffHours / 24
        if (timeDiffDays < 7) { return `${Math.round(timeDiffDays * 100) / 100} days ago` }
        if (timeDiffDays < 30) { return `${Math.floor(timeDiffDays / 7)} weeks ago` }
        if (timeDiffDays < 365) { return `${Math.floor(timeDiffDays / 30)} months ago` }
        return `${Math.floor(timeDiffDays / 365)} years ago`
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
            </div>
        </div>
    )
}

export default CommentBox;