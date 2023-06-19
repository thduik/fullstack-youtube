import { useEffect } from "react"

const CommentBox = ({comment}) => {
    const {authorProfileImageUrl, textDisplay,authorDisplayName, publishedAt, updatedAt, likeCount, textOriginal} = comment.snippet.topLevelComment.snippet
    const [publishDate, setPublishDate] = useState("nullDatelol")
    useEffect(()=>{
        const resTimeDiff = convertDateDiff(publishedAt)
        setPublishDate(resTimeDiff)
    },[publishedAt])
    const convertDateDiff = (dateIso) => { //dateIso = publishedAt, 
        //find difference between Date.now and published at, 
        //published less than 24 hours ago, show hours ago. less than 7 days, show days ago. less than 30 days, show weeks ago. less than 365 days. show months ago.
        
        const timeDiffSec = ( Date.now() - Date.parse(dateIso) ) / 1000
        if (timeDiffSec < 60) { return "Just now"}
        if (timeDiffSec < 3600) { return `${timeDiffSec/60} minutes ago`}
        const timeDiffHours = timeDiffSec / 3600
        if (timeDiffHours < 24) { return `${timeDiffSec/60} hours ago`}
        const timeDiffDays = timeDiffHours / 24
        if (timeDiffDays < 7) {return `${Math.floor(timeDiffDays)} days ago`}
        if (timeDiffDays < 30) {return `${Math.floor(timeDiffDays/7)} weeks ago`}
        if (timeDiffDays < 365) {return `${Math.floor(timeDiffDays/30)} months ago`}
        return `${Math.floor(timeDiffDays/365)} years ago`
    }
    return (
        <div style={{display:"flex", flexDirection:"row", height:"auto", padding:"6px", margin:"8px 0px 8px 0px"}}>
            <div style = {{height:"50px", width:"50px",padding:"5px"}}>
                <img src={authorProfileImageUrl} 
                 height="40px" width="40px" />
            </div>
            <div style={{display:"flex", flexDirection:"column", marginLeft:"20px", height:"auto", width:"auto"}}>
                <div>

                
                <p style={{color:"white", fontSize:"14px", fontWeight:"bold"}}>{authorDisplayName}</p>
                <p style={{color:"white", fontSize:"13px", marginLeft:"6px"}}>{publishDate}</p>
                </div>
                <p style={{color:"white", fontSize:"13px", marginTop:"4px"}}>{textDisplay}</p>
                
                <div style={{display:"flex", flexDirection:"row"}}>

                </div>
            </div>
        </div>
    )
}

export default CommentBox;