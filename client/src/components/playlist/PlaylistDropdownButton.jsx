import { useState } from "react"
import './index.css'


const divStyle = {
    display:"flex", flexDirection:"row"
}

const pPaddingTop = "8px"

const PlaylistDropdownButton = ({iconComponent, text, onClick}) => {
    const [hovering, setHovering] = useState(false)

    const mouseEnteredButton = () => {
        setHovering(true)
        console.log("mouseEnteredButton called")
    }
    const mouseLeftButton = () => {
        setHovering(false)
        console.log("mouseLeftButton called")
    }

    return (
        <div className="video-drop-button-div" style = {{...divStyle, backgroundColor:hovering ? "gray" : "rgba(0,0,0,0)"}}
         onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton} onClick={onClick}>
            {iconComponent}
            <p style={{ color: "white", paddingTop:pPaddingTop, fontSize:"14px" }}>{text}</p>
        </div>
    )
}

export default PlaylistDropdownButton;