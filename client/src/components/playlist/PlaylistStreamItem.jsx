

const PlaylistStreamItem = ({ video }) => {
    
    return (
        <div style={{height:"95px", width:"200px", display: "flex", flexDirection: "row" }}>
            <img height="90px" width="160px" src={video.thumbnailUrl} />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ color: "white" }}>{video.videoName}</p>
                <p style={{ color: "white" }}>{video.videoName}</p>
            </div>
        </div>
    )
}

export default PlaylistStreamItem;