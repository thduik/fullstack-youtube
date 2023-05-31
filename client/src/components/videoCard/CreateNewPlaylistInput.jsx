import { useState } from "react"
import './index.css'
import PrivacyDropdown from "./PrivacyDropdown"

const pStyle = {color:"white", margin:"6px auto 2px 17px", fontSize:"14px"}

const CreateNewPlaylistInput = ({ createPlaylist }) => {
    const [name, setName] = useState("")
    const [privacy, setPrivacy] = useState("Private")

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


        </div>
    )
}

export default CreateNewPlaylistInput;