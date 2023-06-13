import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PlaylistStreamItem from "./PlaylistStreamItem"

const PlaylistStreamMenu = ({currentVideoId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {videoArr, streamedPlaylist, isStreaming} = useSelector(state=>state.playlistStream)
    useEffect(()=>{
        console.log("PlaylistStreamMenu videoArr, streamedPlaylist, isStreaming",
        videoArr, streamedPlaylist, isStreaming)
    },[videoArr, streamedPlaylist, isStreaming])
    useEffect(() => {
        console.log("PlaylistStreamMenu videoArr", videoArr)
    },[videoArr])

    const clickedPlaylistItem = (lol) => {

    }

    return (
        <div style = {{display:"flex",flexDirection:"column", backgroundColor:"#151515",
            maxHeight:"300px", boderRadius:"20px"}}>
            <div style = {{display:"flex", flexDirection:"column", height:"60px", width:"100%"}}>
                <h4 style={{color:"white"}}>{streamedPlaylist && streamedPlaylist.playlistName ? streamedPlaylist.playlistName : "null name"}</h4>
            </div>
            <div style = {{overflowY:"scroll", display:"flex",flexDirection:"column", maxHeight:"300px"}} >
                {videoArr ? videoArr.map(video=><PlaylistStreamItem onClick={clickedPlaylistItem} video={video}/>) : null}
            </div>
            
        </div>
    )
}

export default PlaylistStreamMenu;