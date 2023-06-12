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
import { postPlaylistCreate, postAddVideoToPlaylist } from '../../apiFetch/playlistApi';
import { addPlaylist } from '../../features/appData/playlistSlice';

//for playlist array state management, we use an index system
//selected and unselecting index of playlist array
//because for lifecycle of playlistSelecteMenu, state.playlist.playlists is guaranteed to stay the same

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
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)
    const { selectedVideo, playlists } = useSelector((state) => state.playlist)
    const [selectedIndexArray, setSelectedIndexArray] = useState(playlists.map((x) => { return 0 }))

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
            //[0,1,0,1] means indexes 1 and 3 are selected
            const resIdxArr = []
            const arr = selectedIndexArray.map((isTrue, idx) => {
                if (isTrue) { resIdxArr.push(idx) }
            })
            console.log("res idx arr:", resIdxArr)
            const playlistArr = resIdxArr.map((idx) => playlists[idx])
            console.log("selectedVideo is", selectedVideo)
            postAddVideoToPlaylist(selectedVideo, playlistArr)
        }
    }, [])

    const closeMenu = () => { dispatch(changeShowPlaylistSelectDropdown(false)) }
    const modifySelectedIndexArray = (idx, setTrue) => {
        console.log("modifySelectedIndexArray", idx, setTrue)
        const idxArr = selectedIndexArray; idxArr[idx] = setTrue; setSelectedIndexArray(idxArr)
    }
    const itemSelected = (idx) => {
        console.log("PlaylistSelectMenu itemSelected idx is", idx)
        modifySelectedIndexArray(idx, 1)
    }
    const itemUnselected = (idx) => {
        console.log("PlaylistSelectMenu itemSelected idx is", idx)
        modifySelectedIndexArray(idx, 0)
    }
    const createPlaylistConfirmed = async (playlist) => {
        try {
            //console.log("createPlaylistConfirmed playlistSelectMenu called", playlist.name, playlist.privacy)
            setTimeout(() => { closeMenu() }, 300)
            const userData = { userid: userId, name: name }
            const newPlaylist = utilCreateNewPlaylist(playlist, userData)
            const res = await postPlaylistCreate( newPlaylist, selectedVideo)
            console.log("createPlaylistConfirmed playlistSelectMenu success res.data:", res)
            dispatch(addPlaylist(res.doc))
        } catch(err) {
            console.log("errorcreatePlaylistConfirmed", err)
        }
    }

    return (
        <div className="playlist-select-wrapper"
            style={{ display: showPlaylistSelectDropdown ? "flex" : "none" }}>
            <div style={{
                ...dropdownDivStyle, borderBottom: "1px solid #1E1E1E", flexDirection: "column"
                , display: showPlaylistSelectDropdown ? "flex" : "none"

            }} ref={ref}>

                <PlaylistSelectHeader onClickClose={closeMenu} />
                <div style = {{overflowY:"scroll", maxHeight:"70vh"}}>      
                    {playlists.map((obj, idx) => <PlaylistSelectItem playlist={obj} idx={idx} selectPlaylistItem={itemSelected} unselectPlaylistItem={itemUnselected} />)}
                </div>
                {/* <PlaylistSelectItem selectThisItem={itemSelected}/> */}
                <CreateNewPlaylistComponent createPlaylistConfirmed={createPlaylistConfirmed} />
            </div>
        </div>
    );
}

export default PlaylistSelectMenu;


const utilCreateNewPlaylist = (playlist, user) => {
    var playlistPrivate = playlist.privacy == "Private" ? true : false
    var playlistUnlisted = playlist.privacy == "Unlisted" ? true : false
    const newPlaylist = {
        playlistName: playlist.name,
        userid: user.userid,
        creatorName: user.name,
        isPrivate: playlistPrivate,
        isUnlisted: playlistUnlisted
    }
    return newPlaylist
}