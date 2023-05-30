import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import PlaylistSelectItem from './PlaylistSelectItem';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { changeShowPlaylistSelectDropdown } from '../../features/uiState/uiStateSlice';

import './playlistSelectMenu.css'



const dropdownMenuWidth = "180px"
// const dropdownBackgroundColor = "#363636"
const dropdownBackgroundColor = "green"



const dropdownDivStyle = {
    justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    border: "1px solid gray",
    padding: "9px 0px 9px 0px", borderRadius: "8px"
    , height: "320px"
    ,width:"200px"
    , position: "fixed"
    , zIndex: "1000"
    , margin: "auto"
}

const dropdownButtonStyle = {

}


function PlaylistSelectMenu({saveVideoToPlaylist}) {
    
    const {showPlaylistSelectDropdown} = useSelector((state)=>state.uiState)
    const dispatch = useDispatch()
    useEffect(()=>{

    }, [showPlaylistSelectDropdown])
    const toggleDisplayOff = () => {
        console.log("toggleDisplayOff PlaylistSelectMenu called")
        // console.log("obBluc toggleDisplayOff called")
        dispatch(changeShowPlaylistSelectDropdown(false))
    }

    

    return (
            <div className="playlist-select-wrapper" 
            style = {{display: showPlaylistSelectDropdown ? "flex" : "none"}}>
            <div style={{
                ...dropdownDivStyle, borderBottom: "1px solid gray", flexDirection: "column"
                , display: showPlaylistSelectDropdown ? "flex" : "none"

            }} tabIndex={-1} onBlur={toggleDisplayOff}>
               
                <PlaylistSelectItem/> 
                <PlaylistSelectItem/>                      
            </div>
            </div>
    );
}

export default PlaylistSelectMenu;