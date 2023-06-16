import { useState } from "react"
import PlaylistStreamDropdown from "./PlaylistStreamDropdown"
import { deleteVideoFromPlaylist } from "../../features/appData/playlistStreamSlice"
import { useDispatch } from "react-redux"


const PlaylistStreamItem = ({ video, key, onClick, idx, playlistId="default" }) => {
    const [hovering, setHovering] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useDispatch()
    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedItem = () => {
        onClick({ video: video, key: idx }) //key = index in video array of playlist. state.playlistStream.videoArr
    }

    const deletePlaylistClicked = () => {
        setShowDropdown(false)
        dispatch(deleteVideoFromPlaylist({playlistId:playlistId, videoId:video.videoId}))
        postDeleteVideo({playlistId:playlistId, videoId:video.videoId})
    }
    return (
        <div className="hover-pointer" onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}
            style={{
                height: "90px", width: "100%", display: "flex", flexDirection: "row", margin: "5px 5px 5px 5px"
                , backgroundColor: hovering ? "#343434" : "rgba(0,0,0,0)"
            }}>
            <div style={{ backgroundColor: "rgba(0,0,0,0)", display: "flex", flexDirection: "row", width: "100%" }} onClick={clickedItem}>
                <div style={{ width: "20px", backgroundColor: "rgba(0,0,0,0)" }} >
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "45px", marginLeft: "3px" }}>{idx + 1} </p>
                </div>
                <div style={{
                    margin: "5px 5px 5px 4px", height: "81px", width: "144px", backgroundSize: "cover", overflow: "hidden"
                    , backgroundImage: `url("${video.thumbnailUrl}")`
                }}>
                    {/* <img height="90px" width="160px" src={video.thumbnailUrl} style={{objectFit:"cover"}} /> */}
                </div>

                <div style={{
                    display: "flex", flexDirection: "column", overflowX: "hidden", overflowY: "hidden"
                    , maxHeight: "80px"
                }}>
                    <p style={{ color: "white", fontSize: "14px", marginTop: "20px", marginLeft: "14px", overflowY: "hidden" }}>{video.videoName}</p>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginTop: "10px", marginLeft: "14px", overflowY: "hidden" }}>{video.channelName} </p>
                </div>
            </div>
            <div style={{ marginRight: "5px", marginLeft: "auto", paddingTop: "20px", paddingRight:"6px",width: "40px" }}>
                <PlaylistStreamDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown}
                    deletePlaylist={deletePlaylistClicked} />
            </div>
        </div>
    )
}

export default PlaylistStreamItem;