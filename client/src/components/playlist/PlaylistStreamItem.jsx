import { useState } from "react"


const PlaylistStreamItem = ({ video }) => {
    const [hovering, setHovering] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    return (
        <div className="hover-pointer" onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}
         style={{height:"90px", width:"100%", display: "flex", flexDirection: "row"
        ,backgroundColor: hovering ?  "gray": "rgba(0,0,0,0)"}}>
            <div>
                <img height="90px" width="160px" src={video.thumbnailUrl} style={{objectFit:"cover"}} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", overflowX:"hidden", overflowY:"hidden"
        ,margin:"5px 5px 5px 5px" }}>
                <p style={{ color: "white", fontSize:"14px", marginTop:"20px", marginLeft:"14px" }}>{video.videoName}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize:"13px", marginTop:"10px", marginLeft:"14px" }}>{video.channelName}</p>
            </div>
        </div>
    )
}

export default PlaylistStreamItem;