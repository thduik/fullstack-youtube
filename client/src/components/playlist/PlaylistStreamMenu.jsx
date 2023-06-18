import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PlaylistStreamItem from "./PlaylistStreamItem"
import StandardRoundButton from "../StandardRoundButton"
import LoopPlaylistIcon from "../../icons/LoopPlaylistIcon"
import ShufflePlaylistIcon from "../../icons/ShufflePlaylistIcon"

const PlaylistStreamMenu = ({ currentVideoId, selectPlaylistVideo }) => {
    const [loopPlaylist, setLoopPlaylist] = useState(false)
    const [shufflePlaylist, setShufflePlaylist] = useState(false)

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
    const toggleLoopPlaylist = () => {
        const newState = !loopPlaylist
        setLoopPlaylist(newState)
    }

    const toggleShufflePlaylist = () => {
        const newState = !shufflePlaylist
        setShufflePlaylist(newState)
    }
    return (
        <div className="playlist-stream-menu" style={{width:"auto",borderRadius:"10px 10px 10px 10px",marginBottom:"20px",paddingBottom:"5px"
            ,display: "flex", flexDirection: "column", backgroundColor: "#222222",
            boderRadius: "20px", marginLeft: "12px"
        }}>
            <div style={{ display: "flex", flexDirection: "column", height: "120px", width: "100%", borderRadius:"10px 10px 0px 0px"
            ,backgroundColor: "#313131" }}>
                <h4 style={{ color: "white", fontSize: "14px", marginLeft: "14px", marginTop: "20px" }}>
                    {streamedPlaylist && streamedPlaylist.playlistName ? streamedPlaylist.playlistName : "null name"}

                </h4>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginLeft: "14px",marginTop:"4px" }}>
                    {streamedPlaylist.isPrivate == true ? "Private" : "Public"}
                </p>
                <div style={{display:"flex",flexDirection:"row", marginLeft:"14px", marginTop:"8px"}} >
                    <StandardRoundButton iconComp={<LoopPlaylistIcon fillColor={loopPlaylist ? "white":"rgba(255,255,255,0.6)"}/>} 
                    onClick={toggleLoopPlaylist}/>
                    <div style={{width:"8px"}}/>
                    <StandardRoundButton iconComp={<ShufflePlaylistIcon fillColor={shufflePlaylist ? "white":"rgba(255,255,255,0.6)"}/>} 
                    onClick={toggleShufflePlaylist}/>
                    
                </div>
            </div>
            <div style={{ overflowY: "scroll",overflowX:"hidden", display: "flex", flexDirection: "column", maxHeight: "300px",borderRadius:"0 0 0px 0px"
             ,backgroundColor: "rgba(0,0,0,0)" }} >
                {videoArr ? videoArr.map((video, idx) =>
                    <PlaylistStreamItem onClick={clickedPlaylistItem} video={video} key={idx} idx={idx} playlistId={streamedPlaylist._id}/>) : null}
            </div>

        </div>
    )
}

export default PlaylistStreamMenu;