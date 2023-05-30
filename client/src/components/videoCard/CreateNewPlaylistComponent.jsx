import { useState } from "react"
import CreateNewPlaylistIcon from "../../icons/CreateNewPlaylist"
import CreateNewPlaylistButton from "./CreateNewPlaylistButton"
import './index.css'

const CreateNewPlaylistComponent = () => {
    const [showCreatePlaylistInput, setShowCreatePlaylistInput] = useState(false)
    const showDaInputHere = () => {setShowCreatePlaylistInput(true)}
    return (
        <div>
            {showCreatePlaylistInput ?
                <div style={{padding: "8px 5px 0px 5px", 
                display:"flex", justifyContent:"center"}}>
                    <input className="create-playlist" placeholder="Enter here bitch"></input>
                </div>
                :
                <CreateNewPlaylistButton showDaInput={showDaInputHere}/>
            }

        </div>
    )
}

export default CreateNewPlaylistComponent;