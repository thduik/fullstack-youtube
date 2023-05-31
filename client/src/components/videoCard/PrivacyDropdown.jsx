import { useState } from "react"
import GlobeIcon from "../../icons/GlobeIcon"
import LockIcon from "../../icons/LockIcon"
import UnlistedIcon from "../../icons/UnlistedIcon"
import PrivacyDropdownButton from "./PrivacyDropdownButton"

const backgroundColor =  "#363636" //"#212121"


const dropdownDivStyle = {position:"absolute",
    backgroundColor:backgroundColor, width:"180px", marginLeft:"20px", marginTop:"-20px"}

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
        <div style={{display:"flex",justifyContent:"center", backgroundColor:backgroundColor}}>
            <div style={{...dropdownDivStyle
                ,flexDirection:"column"
                ,display:showDropdown ? "flex" : "none"}}>
                <PrivacyDropdownButton iconComp={<GlobeIcon height="24px" width="24px"/>} 
                text="Public" onClick={clickedDropdown}/>
                <PrivacyDropdownButton iconComp={<LockIcon/>} text="Private" onClick={clickedDropdown}/>
                <PrivacyDropdownButton iconComp={<UnlistedIcon/>} text="Unlisted" onClick={clickedDropdown}/>
            </div>
            <div style={{width:"167px", borderBottom:"2px solid white", marginBottom:"6px"}} onClick={showDaDropdown}>
                <p style={{color:"white", fontSize:"14px",marginBottom:"4px"}}>{privacyText}</p>
            </div>
            
        </div>
    )
}

export default PrivacyDropdown;