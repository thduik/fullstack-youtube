import { useState } from "react"

const ChannelNavButton = ({title, onClick, idx, selectedIdx
    , width="100px", height="40px", hoverColor="#999999", mouseDownColor="#666666"}) => {
    const [hovering, setHovering] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedButton = () => onClick()
    const mouseDowned = () => {setMouseDown(true)}
    const mouseUpped = () => {setMouseDown(false)}
    
    return (
        <div style={{width:width, height:height, display:"flex", justifyContent:"center"
            ,borderBottom:"2px solid white"
        }}
        onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick = {clickedButton} 
        onMouseDown={mouseDowned} onMouseUp={mouseUpped}
        >
            
           
            <p style={{color:"white", fontSize:"15px"}}>{title}</p>
            
        </div>
    )
}

export default ChannelNavButton;