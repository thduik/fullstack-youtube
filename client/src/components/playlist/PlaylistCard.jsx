import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import VerticalThreeDotIcon from "../../icons/VerticalThreeDotIcon"
// import { changeIsStreaming, setVideoArray, setStreamedPlaylist } from "../../features/appData/playlistStreamSlice"
// import { getVideosOfPlaylist } from "../../apiFetch/playlistApi"

const PlaylistCard = ({ playlist }) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
   


    const [hovering, setHovering] = useState(false)
    useEffect(() => {
        console.log("PlaylistCard playlist", playlist)
    }, [playlist.playlistName])

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedComp = () => {
        console.log("clickedComp playlist is:", playlist)
        
        //here, navigate to first video of playlist
        //pass playlist param to url as video=videoId?playlist=playlistId (videoId of first video)
        //dispatch to redux data of all remaining videosz in playlistos
        //custom = my own personal playlist system


        const playlistId = playlist._id
        // getVideosOfPlaylist(playlistId, (videoArr)=>{
        //     videoArr.sort((a,b)=>a.createdAt - b.createdAt)
        //     dispatch(changeIsStreaming(true))
        //     dispatch(setVideoArray(videoArr))
        //     dispatch(setStreamedPlaylist(playlist))
        //     console.log("getVideosOfPlaylist success", videoArr)
        navigate(`/video/${videoArr[0].videoId}?playlist=${playlistId}&custom=true`)
        // }).catch( (err) => {
        //     throw("err getVideosOfPlaylist", err)
        // })
        
    }
    return (
        <div className="hover-pointer" style={{
            height: "190px", width: "200px", display: "flex", flexDirection: "column"
            , margin: "10px 4px 10px 4px"
        }}
            onClick={clickedComp} onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}>
            <img borderRadius="20px" height={"115px"} width={"200px"} src={playlist.thumbnailUrl} />
            <div >
                <div>
                    <p style={{ color: "white" }}>{playlist.count} videos</p>
                    <p style={{ color: "white", }}>{playlist.playlistName}</p>
                </div>
                
                
            </div>

        </div>
    )
}

export default PlaylistCard;