import { useState } from "react"


const StandardRoundButton = ({iconComp,onClick, idleBColor = "rgba(0,0,0,0)"}) => {
    const [hovering, setHovering] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedButton = () => onClick()
    const mouseDowned = () => {setMouseDown(true)}
    const mouseUpped = () => {setMouseDown(false)}

    
    return (
        <div className="hover-pointer" style={{width:"30px", height:"30px", display:"flex", justifyContent:"center",borderRadius:"15px"
        ,backgroundColor:hovering ?
             mouseDown ? "#575757" : "#494949"
         : idleBColor}}
        onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick = {clickedButton} 
        onMouseDown={mouseDowned} onMouseUp={mouseUpped}>
            {iconComp}
        </div>
    )
}

export default StandardRoundButton;