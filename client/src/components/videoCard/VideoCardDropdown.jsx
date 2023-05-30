import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import { useSelector, useDispatch } from 'react-redux'
import VerticalThreeDotIcon from '../../icons/VerticalThreeDotIcon';
import SaveToPlaylistIcon from '../../icons/SaveToPlaylistIcon';
import VideoDropdownButton from './VideoDropdownButton';


const wrapperBackgroundColor = "rgba(0,0,0,0)" //important because all elements being transparent allow effects to work
const totalWidth = "34px"
const buttonFontColor = "#3ea6ff"


const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-200px"
const dropdownBackgroundColor = "black"

const wrapperStyle = {
    width: totalWidth, paddingTop: "3px",
    paddingLeft: "0px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0)"
    ,marginLeft:"10px",wrapperBackgroundColor
}
const accountIconDivStyle = {
    backgroundColor: "rgba(0,0,0,0)", marginLeft:"-5px", paddingRight:"10px"
}

const dropdownDivStyle = {
    justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft,
    border: "1px solid gray",
    padding: "5px 0px 2px 0px", borderRadius: "22px"
    ,marginTop:"-69px"
}

const dropdownButtonStyle = {

}


function VideoCardDropdown() {
    const [showDropdown, setShowDropdown] = useState(false)
    
    const dispatch = useDispatch()
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)

    



    const toggleMenuDisplay = () => {
        const newState = !showDropdown
        setShowDropdown(newState)
    }

    const saveToPlaylistClicked = () => {
        console.log("saveToPlaylistClicked")
    }

    const addToQueueClicked = () => {
        console.log("addToQueueClicked")
    }

    return (
        <div className="" style={wrapperStyle}>
            {/* <button className="sign-in" style={{ border: "none", backgroundColor:"rgba(0,0,0,0)" }} onClick={toggleMenuDisplay}> */}
                <div style={accountIconDivStyle} onClick={toggleMenuDisplay}>
                    <VerticalThreeDotIcon/>
                </div>

            {/* </button> */}

            <div style={{...dropdownDivStyle, borderBottom:"1px solid gray"
            ,display: showDropdown ? "flex" : "none", flexDirection:"column"}} >
                <VideoDropdownButton iconComponent = {<SaveToPlaylistIcon/>} text = 'Save to Playlist' onClick={saveToPlaylistClicked}/>
                <VideoDropdownButton iconComponent = {<SaveToPlaylistIcon/>} text = 'Add to QUeue' onClick={addToQueueClicked}/>
            </div>
        </div>

    );
}

export default VideoCardDropdown;