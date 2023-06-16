import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import { useSelector, useDispatch } from 'react-redux'
import VerticalThreeDotIcon from '../../icons/VerticalThreeDotIcon';
import SaveToPlaylistIcon from '../../icons/SaveToPlaylistIcon';
import PlaylistDropdownButton from './PlaylistDropdownButton';
import DropdownTriggerButton from './DropdownTriggerButton';
import TrashCanIcon from '../../icons/TrashCanIcon';


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
    , marginTop: "-29px"
    , zIndex:"10000"
    ,position:"relative"
}

const dropdownButtonStyle = {

}


function PlaylistStreamDropdown({deletePlaylist, showDropdown, setShowDropdown}) {
    const dispatch = useDispatch()
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)


    const toggleMenuDisplay = () => {
        const newState = !showDropdown
        setShowDropdown(newState)
    }

    const deletePlaylistClicked = () => {
        console.log("deletePlaylistClicked")
        setShowDropdown(false)
        deletePlaylist()
x``
    }

    const addToQueueClicked = () => {
        console.log("addToQueueClicked")
    }

    const toggleDisplayOff = () => {
        console.log(" toggleDisplayOff called")
        setShowDropdown(false)
    }

    

    return (
        <div className="" style={wrapperStyle} tabIndex={-1} onBlur={toggleDisplayOff}>
            
            <DropdownTriggerButton iconComp={<VerticalThreeDotIcon />} onClick={toggleMenuDisplay}/>
           
            <div style={{
                ...dropdownDivStyle, borderBottom: "1px solid gray"
                , display: showDropdown ? "flex" : "none", flexDirection: "column"
            }} >

                {isLoggedIn ? <PlaylistDropdownButton iconComponent={<TrashCanIcon />} iconMarginTop="4px" text='Remove from playlist' onClick={deletePlaylistClicked} /> : null}
                <PlaylistDropdownButton iconComponent={<SaveToPlaylistIcon />} text='Add to QUeue' onClick={addToQueueClicked} />
            </div>
        </div>

    );
}

export default PlaylistStreamDropdown;