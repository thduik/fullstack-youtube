import { useEffect } from "react"
import { useSelector } from "react-redux"

const PlaylistCard = ({playlist}) => {
    useEffect(()=>{
        console.log("PlaylistCard playlist", playlist)
    },[playlist.playlistName])
    return (
        <div style={ {height:"90px", width:"160px"} }>
            <img height={"90px"} width={"160px"} src = {playlist.thumbnailUrl}/>
            <p style={{color:"white"}}>{playlist.playlistName}</p>
            <p style={{color:"white"}}>{playlist.count} videos</p>
        </div>
    )
}

export default PlaylistCard;