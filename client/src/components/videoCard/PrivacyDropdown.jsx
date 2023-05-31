import { useState } from "react"
import GlobeIcon from "../../icons/GlobeIcon"
import PrivacyDropdownButton from "./PrivacyDropdownButton"

const backgroundColor = "#212121"

const dropdownDivStyle = {width:"180px", marginLeft:"20px", marginTop:"-20px"}

const PrivacyDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [privacyText, setPrivacyText] = useState("Private")
    const clickedDropdown = (text) => {
        console.log("PrivacyDropdown clicked text is",text)
        setShowDropdown(false)
        setText
    }
    const showDaDropdown = () => {setShowDropdown(true)}

    return (
        <div style={{display:"flex",justifyContent:"center", backgroundColor:backgroundColor}}>
            <div style={{...dropdownDivStyle
                ,display:showDropdown ? "flex" : "none"}}>
                <PrivacyDropdownButton iconComp={<GlobeIcon/>} text="Public" onClick={clickedDropdown}/>
                <PrivacyDropdownButton iconComp={<GlobeIcon/>} text="Private" onClick={clickedDropdown}/>
                <PrivacyDropdownButton iconComp={<GlobeIcon/>} text="Unlisted" onClick={clickedDropdown}/>
            </div>
            <div style={{width:"87%", borderBottom:"2px solid white"}} onClick={showDaDropdown}>
                <p style={{color:"white", fontSize:"14px"}}>{"Public"}</p>
            </div>
            
        </div>
    )
}

export default PrivacyDropdown;