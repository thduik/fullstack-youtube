import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PlaylistStreamItem from "./PlaylistStreamItem"

const PlaylistStreamMenu = ({ currentVideoId, selectPlaylistVideo }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { videoArr, streamedPlaylist, isStreaming } = useSelector(state => state.playlistStream)
    useEffect(() => {
        console.log("PlaylistStreamMenu videoArr, streamedPlaylist, isStreaming",
            videoArr, streamedPlaylist, isStreaming)
    }, [videoArr, streamedPlaylist, isStreaming])
    useEffect(() => {
        console.log("PlaylistStreamMenu videoArr", videoArr)
    }, [videoArr])

    const clickedPlaylistItem = ({ video, key }) => {  //key = index in video array of playlist. state.playlistStream.videoArr
        console.log("PlaylistStreamMenu clickedPlaylistItem", video, key)
        selectPlaylistVideo({ video: video, key: key })
    }

    return (
        <div className="playlist-stream-menu" style={{
            display: "flex", flexDirection: "column", backgroundColor: "#151515",
            boderRadius: "20px", marginLeft: "12px"
        }}>
            <div style={{ display: "flex", flexDirection: "column", height: "120px", width: "100%", backgroundColor: "#363636" }}>
                <h4 style={{ color: "white", fontSize: "14px", marginLeft: "14px", marginTop: "20px" }}>
                    {streamedPlaylist && streamedPlaylist.playlistName ? streamedPlaylist.playlistName : "null name"}

                </h4>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginLeft: "14px" }}>
                    {streamedPlaylist.isPrivate == true ? "Private" : "Public"}
                </p>
            </div>
            <div style={{ overflowY: "scroll", display: "flex", flexDirection: "column", maxHeight: "300px", backgroundColor: "rgba(0,0,0,0)" }} >
                {videoArr ? videoArr.map((video, idx) =>
                    <PlaylistStreamItem onClick={clickedPlaylistItem} video={video} key={idx} idx={idx} />) : null}
            </div>

        </div>
    )
}

export default PlaylistStreamMenu;