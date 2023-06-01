import { useState } from "react"
import CreateNewPlaylistIcon from "../../icons/CreateNewPlaylist"

import './index.css'

const PrivacyDropdownButton = ({iconComp, text, onClick
    , pMarginTop="0px", iconMarginTop="0px"}) => {
   
    const [hovering, setHovering] = useState(false)
   
    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }

    const clickedThisItem = () => {
        onClick(text)
    }
    return (
        <div className="create-playlist hover-pointer" onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}
            style={{
                display: "flex", flexDirection: "row", justifyContent: "space-evenly",
                padding: "8px 5px 6px 5px"
                , backgroundColor: hovering ? "gray" : "rgba(0,0,0,0)"
                
            }}  onClick={clickedThisItem}>
            <div style={{marginLeft:"10px", marginTop:iconMarginTop}}>
                {iconComp}
            </div>
            <div style={{width:"87%"}}>
                <p style={{ color: "white", fontSize:"14px"
            ,textAlign:"left", marginLeft:"15px", marginTop:pMarginTop }}>{text}</p>
            </div>

        </div>
    )
}

export default PrivacyDropdownButton;