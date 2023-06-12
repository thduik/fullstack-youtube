import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PlaylistStreamItem from "./PlaylistStreamItem"

const PlaylistStreamMenu = ({currentVideoId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const {videoArr, streamedPlaylist, isStreaming} = useSelector(state=>state.playlistStream)

    useEffect(() => {
        console.log("PlaylistStreamMenu videoArr", videoArr)
    },[videoArr])

    const clickedPlaylistItem = (lol) => {

    }

    return (
        <div style = {{display:"flex",flexDirection:"column",
            maxHeight:"300px", overflowY:"scroll"}}>
            {videoArr ? videoArr.map(video=><PlaylistStreamItem onClick={clickedPlaylistItem} video={video}/>) : null}
        </div>
    )
}

export default PlaylistStreamMenu;