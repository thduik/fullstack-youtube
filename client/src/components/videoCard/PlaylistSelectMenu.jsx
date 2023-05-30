import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import { useSelector, useDispatch } from 'react-redux'
import PlaylistSelectItem from './PlaylistSelectItem';





const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-190px"
const dropdownBackgroundColor = "#363636"


const dropdownDivStyle = {
    justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft,
    border: "1px solid gray",
    padding: "9px 0px 9px 0px", borderRadius: "8px"
    , margin:"auto"
    , height: "120px"
}

const dropdownButtonStyle = {

}


function PlaylistSelectMenu({saveVideoToPlaylist, setShowDropdown, showDropdown}) {
    

    const dispatch = useDispatch()
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)

    const toggleMenuDisplay = () => {
        const newState = !showDropdown
        setShowDropdown(newState)
    }
    const toggleDisplayOff = () => {
        // console.log("obBluc toggleDisplayOff called")
        setShowDropdown(false)
    }

    
    return (
            <div style = {{ position: "fixed" , margin:"0", backgroundColor:"rgba(0,0,0,0.3)"}}>
            <div style={{
                ...dropdownDivStyle, borderBottom: "1px solid gray"
                , display: showDropdown ? "flex" : "none", flexDirection: "column"

            }} onBlur={toggleDisplayOff}>
               
                <PlaylistSelectItem/> 
                <PlaylistSelectItem/>                      
            </div>
            </div>
    );
}

export default PlaylistSelectMenu;