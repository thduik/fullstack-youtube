import { useState } from "react"
import CreateNewPlaylistIcon from "../../icons/CreateNewPlaylist"
import CreateNewPlaylistButton from "./CreateNewPlaylistButton"
import CreateNewPlaylistInput from "./CreateNewPlaylistInput"
import './index.css'

const CreateNewPlaylistComponent = () => {
    const [showCreatePlaylistInput, setShowCreatePlaylistInput] = useState(false)
    const showDaInputHere = () => {setShowCreatePlaylistInput(true)}
    return (
        <div>
            {showCreatePlaylistInput ?
                <CreateNewPlaylistInput />
                :
                <CreateNewPlaylistButton showDaInput={showDaInputHere} />
            }

        </div>
    )
}

export default CreateNewPlaylistComponent;