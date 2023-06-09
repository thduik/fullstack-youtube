import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import { useSelector, useDispatch } from 'react-redux'
import VerticalThreeDotIcon from '../../icons/VerticalThreeDotIcon';
import SaveToPlaylistIcon from '../../icons/SaveToPlaylistIcon';
import VideoDropdownButton from './VideoDropdownButton';
import DropdownTriggerButton from '../playlist/DropdownTriggerButton';


const wrapperBackgroundColor = "rgba(0,0,0,0)" //important because all elements being transparent allow effects to work
const totalWidth = "34px"
const buttonFontColor = "#3ea6ff"


const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-190px"
const dropdownBackgroundColor = "#363636"

const wrapperStyle = {
    width: totalWidth, paddingTop: "3px",
    paddingLeft: "0px", borderRadius: "0px", border: "1px solid rgba(0,0,0,0)"
    , marginLeft: "10px", wrapperBackgroundColor
}
const accountIconDivStyle = {
    backgroundColor: "rgba(0,0,0,0)", marginLeft: "-5px", paddingRight: "10px"
}

const dropdownDivStyle = {
    justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft,
    border: "1px solid gray",
    padding: "9px 0px 9px 0px", borderRadius: "8px"
    , marginTop: "-69px"
}

const dropdownButtonStyle = {

}


function VideoCardDropdown({saveVideoToPlaylist, showDropdown, setShowDropdown}) {
    // const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useDispatch()
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)


    const toggleMenuDisplay = () => {
        const newState = !showDropdown
        setShowDropdown(newState)
    }

    const saveToPlaylistClicked = async () => {
        console.log("saveToPlaylistClicked")
        await setShowDropdown(false)
        saveVideoToPlaylist()
    }

    const addToQueueClicked = () => {
        console.log("addToQueueClicked")
    }

    const toggleDisplayOff = () => {
        console.log(" toggleDisplayOff called")
        setShowDropdown(false)
    }

    

    return (
        <div className="hover-pointer" style={wrapperStyle} tabIndex={-1} onBlur={toggleDisplayOff}>
            <DropdownTriggerButton iconComp={<VerticalThreeDotIcon />} onClick={toggleMenuDisplay}/>
            
            <div style={{
                ...dropdownDivStyle, borderBottom: "1px solid gray"
                , display: showDropdown ? "flex" : "none", flexDirection: "column"
            }} >

                {isLoggedIn ? <VideoDropdownButton iconComponent={<SaveToPlaylistIcon />} text='Save to Playlist' onClick={saveToPlaylistClicked} /> : null}
                <VideoDropdownButton iconComponent={<SaveToPlaylistIcon />} text='Add to QUeue' onClick={addToQueueClicked} />
            </div>
        </div>

    );
}

export default VideoCardDropdown;