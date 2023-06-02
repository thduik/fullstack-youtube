import { useState } from "react"

const divStyle = {margin:"4px 0px 4px 0px", display:"flex", flexDirection:"row"}
const iconDivStyle = {marginLeft:"15px", marginRight:"auto"}
const UserDropdownButton = ({iconSvg, title, onClick}) => {
    
    const [buttonHover, setButtonHover] = useState(false)
    const mouseEnteredButton = () => { setButtonHover(true) }
    const mouseLeftButton = () => { setButtonHover(false) }
    const clickedButton = () => {onClick()}
    return (
        <div className="hover-pointer" onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton} onClick = {clickedButton}
        style={{...divStyle, backgroundColor:buttonHover ? "gray" : "rgba(0,0,0,0)"}}>
            <div style={{...iconDivStyle}}>
                {iconSvg}
            </div>
            <div style={{marginLeft:"0", marginRight:"auto", textAlign:"left", width:"120px"}}>
                <p style={{color:"white", marginRight:"auto",marginLeft:"15px",fonSize:"13px"}}>{title}</p>
            </div>
            
        </div>
    )
}

export default UserDropdownButton;