import { useState } from "react"
import DropdownArrowDownIcon from "../../icons/DropdownArrowDownIcon"
import GlobeIcon from "../../icons/GlobeIcon"
import LockIcon from "../../icons/LockIcon"
import UnlistedIcon from "../../icons/UnlistedIcon"
import PrivacyDropdownButton from "./PrivacyDropdownButton"

const dropdownBackgroundColor = "#212121" 
const buttonBackgroundColor = "#363636"
const buttonDivStyle = {width:"167px", borderBottom:"2px solid rgba(255,255,255,0.8)"
, marginBottom:"6px", backgroundColor:buttonBackgroundColor
, display:"flex", flexDirection:"row"}


const dropdownDivStyle = {position:"absolute", flexDirection:"column"
    ,backgroundColor:dropdownBackgroundColor, width:"200px", marginLeft:"20px", marginTop:"-20px"
    ,boxShadow:"1px 1px #000000"}

const PrivacyDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [privacyText, setPrivacyText] = useState("Private")
    const clickedDropdown = (text) => {
        console.log("PrivacyDropdown clicked text is",text)
        setShowDropdown(false)
        setPrivacyText(text)
        
    }
    const showDaDropdown = () => {setShowDropdown(true)}
    
    return (
        <div style={{display:"flex",justifyContent:"center", backgroundColor:buttonBackgroundColor}}>
            <div style={{...dropdownDivStyle
                // ,backgroundColor:showDropdown ? dropdownBackgroundColor : "rgba(0,0,0,0)"
                ,display:showDropdown ? "flex" : "none"}}>
                <PrivacyDropdownButton iconComp={<GlobeIcon height="24px" width="24px"/>} 
                text="Public" onClick={clickedDropdown}/>
                <PrivacyDropdownButton iconComp={<LockIcon/>} text="Private" onClick={clickedDropdown}/>
                <PrivacyDropdownButton iconComp={<UnlistedIcon/>} text="Unlisted" onClick={clickedDropdown}/>
            </div>
            <div style={{...buttonDivStyle}} onClick={showDaDropdown}>
                <p style={{color:"rgba(255,255,255,0.8)", fontSize:"14px",marginBottom:"4px"}}>{privacyText}</p>
                <div style={{marginLeft:"100px",marginRight:"20px"}}><DropdownArrowDownIcon/></div>
            </div>
            
        </div>
    )
}

export default PrivacyDropdown;