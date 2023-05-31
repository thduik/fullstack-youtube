import { useState } from "react"
import './index.css'
import PrivacyDropdown from "./PrivacyDropdown"

const pStyle = {color:"white", margin:"6px auto 2px 17px", fontSize:"14px"}
const createButtonStyle = {marginRight:"16px", marginLeft:"auto",
width:"68px",borderRadius:"15px", height:"34px", textAlign:"center"}
const CreateNewPlaylistInput = ({ createPlaylist }) => {
    const [name, setName] = useState("")
    const [privacyText, setPrivacyText] = useState("Private")
    
    const [buttonHover, setButtonHover] = useState(false)
    const createNewPlaylistClicked = () => {

    }
    const mouseEnteredButton = () => {setButtonHover(true)}
    const mouseLeftButton = () => {setButtonHover(false)}
    return (
        <div style={{display:"flex", flexDirection:"column",justifyContent:"center"}}>
            <div style={{
                // padding: "8px 5px 0px 5px",
                // borderBottom:"2px solid white",
                display: "flex", flexDirection:"column",justifyContent: "center"
            }}>
                <p style={pStyle}>{'Name'}</p>
                <input className="create-playlist" placeholder="Enter here bitch"></input>
            </div>

            <div style={{marginTop:"10px"}}>
                <PrivacyDropdown/>

            </div>
            <div>
                <div style={{...createButtonStyle, backgroundColor:buttonHover ? "rgba(6, 95, 212, 0.4)" : "rgba(0,0,0,0)"}} 
                onClick={createNewPlaylistClicked} onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton}>
                   <p style={{color:"#3ea6ff", fontSize:"15px", paddingTop:"10px"}}> {"Create"} </p> 
                </div>
            </div>

        </div>
    )
}

export default CreateNewPlaylistInput;