import { useState } from "react"


const PlaylistStreamItem = ({ video }) => {
    const [hovering, setHovering] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    return (
        <div style={{height:"90px", width:"100%", display: "flex", flexDirection: "row"
        ,backgroundColor: hovering ? "rgba(0,0,0,0)" : "gray" }}>
            <div>
                <img height="90px" width="160px" src={video.thumbnailUrl} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", overflowX:"clip" }}>
                <p style={{ color: "white", fontSize:"13px" }}>{video.videoName}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize:"12px" }}>{video.channelName}</p>
            </div>
        </div>
    )
}

export default PlaylistStreamItem;