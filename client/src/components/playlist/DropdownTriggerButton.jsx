import { useState } from "react"


const DropdownTriggerButton = ({iconComp,onClick}) => {
    const [hovering, setHovering] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedButton = () => onClick()
    const mouseDowned = () => {setMouseDown(true)}
    const mouseUpped = () => {setMouseDown(false)}

    
    return (
        <div style={{width:"30px", height:"30px", display:"flex", justifyContent:"center"
        ,backgroundColor:hovering ?
             mouseDown ? "#343434" : "#212121"
         : "rgba(0,0,0,0)"}}
        onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick = {clickedButton} 
        onMouseDown={mouseDowned} onMouseUp={mouseUpped}>
            {iconComp}
        </div>
    )
}

export default DropdownTriggerButton;