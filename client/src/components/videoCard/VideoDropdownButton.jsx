import { useState } from "react"

const divStyle = {
    display:"flex", flexDirection:"row"
}

const VideoDropdownButton = ({iconComponent, text, onClick}) => {
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
        <div style = {{...divStyle, backgroundColor:hovering ? "gray" : "rgba(0,0,0,0)"}}
         onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton} onClick={onClick}>
            {iconComponent}
            <p style={{ color: "white" }}>{text}</p>
        </div>
    )
}

export default VideoDropdownButton;