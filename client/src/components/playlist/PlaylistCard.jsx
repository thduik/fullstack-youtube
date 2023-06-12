import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import VerticalThreeDotIcon from "../../icons/VerticalThreeDotIcon"
import { changeIsStreaming } from "../../features/appData/playlistStreamSlice"

const PlaylistCard = ({ playlist }) => {
    
    const navigate = useNavigate()
   

    const { changeIsStreaming } = useSelector((state) => state.playlistStream)

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
        
        navigate(`/video/${videoId}?playlist=${playlistId}?custom=true`)
    }
    return (
        <div className="hover-pointer" style={{
            height: "190px", width: "200px", display: "flex", flexDirection: "column"
            , margin: "10px 2px 10px 2px"
        }}
            onClick={clickedComp} onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}>
            <img borderRadius="20px" height={"144px"} width={"200px"} src={playlist.thumbnailUrl} />
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