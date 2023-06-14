import { useState } from "react"


const PlaylistStreamItem = ({ video, key, onClick, idx }) => {
    const [hovering, setHovering] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedItem = () => {
        onClick({video:video, key:idx}) //key = index in video array of playlist. state.playlistStream.videoArr
    }
    return (
        <div className="hover-pointer" onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick={clickedItem}
         style={{height:"90px", width:"100%", display: "flex", flexDirection: "row",margin:"5px 5px 5px 5px"
        ,backgroundColor: hovering ?  "gray": "rgba(0,0,0,0)"}}>
            <div style={{width:"20px"}}>
            <p style = {{color:"rgba(255,255,255,0.8)", fontSize:"12px", marginTop:"45px", marginLeft:"3px"}}>{idx + 1} </p>
            </div>
            <div style={{margin:"5px 5px 5px 4px", height:"81px", width:"144px", backgroundSize:"cover", overflow:"hidden"
                ,backgroundImage:`url("${video.thumbnailUrl}")`}}>
                {/* <img height="90px" width="160px" src={video.thumbnailUrl} style={{objectFit:"cover"}} /> */}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", overflowX:"hidden", overflowY:"hidden"
        , maxHeight:"80px" }}>
                <p style={{ color: "white", fontSize:"14px", marginTop:"20px", marginLeft:"14px",overflowY:"hidden" }}>{video.videoName}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize:"13px", marginTop:"10px", marginLeft:"14px",overflowY:"hidden" }}>{video.channelName}</p>
            </div>
        </div>
    )
}

export default PlaylistStreamItem;