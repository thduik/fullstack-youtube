
const CommentBox = ({snippet:{topLevelComment,videoId}}) => {
    const {authorProfileImageUrl, textDisplay,authorDisplayName} = topLevelComment.snippet
    
    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <div style = {{height:"50px", width:"50px",padding:"5px"}}>
                <img src={authorProfileImageUrl}
                 height="40px" width="40px" />
            </div>
            <div style={{display:"flex", flexDirection:"column", marginLeft:"15px"}}>
                <p style={{color:"white", fontSize:"14px", fontWeight:"bold"}}>{authorDisplayName}</p>
                <p style={{color:"white", fontSize:"13px"}}>{textDisplay}</p>
                
                <div style={{display:"flex", flexDirection:"row"}}>

                </div>
            </div>
        </div>
    )
}

export default CommentBox;