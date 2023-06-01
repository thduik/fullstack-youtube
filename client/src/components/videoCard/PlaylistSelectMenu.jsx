import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import PlaylistSelectItem from './PlaylistSelectItem';
import { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { changeShowPlaylistSelectDropdown } from '../../features/uiState/uiStateSlice';

import './playlistSelectMenu.css'
import CreateNewPlaylistComponent from './CreateNewPlaylistComponent';
import PlaylistSelectHeader from './PlaylistSelectHeader';



const dropdownMenuWidth = "180px"
const dropdownBackgroundColor = "#363636"
// const dropdownBackgroundColor = "#1E1E1E"

const dropdownDivStyle = {
    justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    border: "1px solid #1E1E1E",
    padding: "9px 0px 9px 0px", borderRadius: "8px"
    , width: "200px"
    , position: "fixed"
    , zIndex: "1000"
    , margin: "auto"
}

const dropdownButtonStyle = {

}


function PlaylistSelectMenu({ saveVideoToPlaylist }) {
    const { showPlaylistSelectDropdown } = useSelector((state) => state.uiState)
    const { selectedVideo } = useSelector((state) => state.playlist)
    // const { onClickOutside } = props;
    const dispatch = useDispatch()

    const ref = useRef(null);
    const onClickOutside = () => {
        console.log("onClickOutside PlaylistSelectMenu called")
        dispatch(changeShowPlaylistSelectDropdown(false))
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    useEffect(() => {
        return () => {
            // Anything in here is fired on component unmount.
            //only call api after component unmount
        }
    }, [])

    const closeMenu = () => {dispatch(changeShowPlaylistSelectDropdown(false))}
    const itemSelected = (text) => {
        console.log("PlaylistSelectMenu itemSelected text+video snippet are", text, 
        selectedVideo)
    }
    return (
        <div className="playlist-select-wrapper"
            style={{ display: showPlaylistSelectDropdown ? "flex" : "none" }}>
            <div style={{
                ...dropdownDivStyle, borderBottom: "1px solid #1E1E1E", flexDirection: "column"
                , display: showPlaylistSelectDropdown ? "flex" : "none"

            }} ref={ref}>
                
                <PlaylistSelectHeader onClickClose={closeMenu}/>
                <PlaylistSelectItem selectThisItem={itemSelected}/>
                <PlaylistSelectItem selectThisItem={itemSelected}/>
                <CreateNewPlaylistComponent/>
            </div>
        </div>
    );
}

export default PlaylistSelectMenu;