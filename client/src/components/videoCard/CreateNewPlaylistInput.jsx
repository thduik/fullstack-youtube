import { useState } from "react"
import './index.css'
import PrivacyDropdown from "./PrivacyDropdown"

const CreateNewPlaylistInput = ({ createPlaylist }) => {
    const [name, setName] = useState("")
    const [privacy, setPrivacy] = useState("Private")

    return (
        <div>
            <div style={{
                // padding: "8px 5px 0px 5px",
                borderBottom:"2px solid white"
                ,display: "flex", justifyContent: "center"
            }}>
                <p style={{color:"white"}}>{'Name'}</p>
                <input className="create-playlist" placeholder="Enter here bitch"></input>
            </div>

            <div>
                <PrivacyDropdown/>
            </div>


        </div>
    )
}

export default CreateNewPlaylistInput;