import { useState } from "react"
import CreateNewPlaylistIcon from "../../icons/CreateNewPlaylist"
import CreateNewPlaylistButton from "./CreateNewPlaylistButton"
import CreateNewPlaylistInput from "./CreateNewPlaylistInput"
import './index.css'

const CreateNewPlaylistComponent = ({createPlaylistConfirmed}) => {
    const [showCreatePlaylistInput, setShowCreatePlaylistInput] = useState(false)
    const showDaInputHere = () => {setShowCreatePlaylistInput(true)}
    const createPlaylistConfirmed = () => {createPlaylistConfirmed()}
    return (
        <div>
            {showCreatePlaylistInput ?
                <CreateNewPlaylistInput createPlaylistConfirmed={createPlaylistConfirmed} />
                :
                <CreateNewPlaylistButton showDaInput={showDaInputHere} />
            }

        </div>
    )
}

export default CreateNewPlaylistComponent;