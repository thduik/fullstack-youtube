import { useState } from "react"
import CreateNewPlaylistIcon from "../../icons/CreateNewPlaylist"

import './index.css'

const CreateNewPlaylistButton = ({showDaInput}) => {
   
    const [hovering, setHovering] = useState(false)
   
    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    return (
        <div className="create-playlist hover-pointer" onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}
            style={{
                display: "flex", flexDirection: "row", justifyContent: "space-around",
                padding: "8px 5px 0px 5px"
                , backgroundColor: hovering ? "gray" : "rgba(0,0,0,0)"
                
            }}  onClick={showDaInput}>
            <div style={{  }}>
                <CreateNewPlaylistIcon/>
            </div>
            <div>
                <p style={{ color: "white", fontSize:"14px", marginTop:"3px"
            ,textAlign:"left" }}>{"Create New Playlist"}</p>
            </div>

        </div>
    )
}

export default CreateNewPlaylistButton;