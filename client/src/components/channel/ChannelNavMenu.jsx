import { useState } from "react";
import ChannelNavButton from "./ChannelNavButton";



const ChannelNavMenu = ({channel, onClick}) => {
    const [selectedIdx,setSelectedIdx] = useState(-1)

    const homeClicked = () => {onClick(0)}
    const videoClicked = () => {onClick(1)}
    const playlistClicked = () => {onClick(3)}
    return (
        <div className="hover-pointer" style={{
            height:"40px", width:"100%", display:"flex", flexDirection:"row"}}>
            <div style={{margin:"auto", backgroundColor:"rgba(0,0,0,0)"
                ,display:"flex", flexDirection:"row"}}>    
                
            <ChannelNavButton title = "Home" onClick={homeClicked}/>
            <ChannelNavButton title = "Video" onClick={videoClicked}/>
            <ChannelNavButton title = "Shorts" onClick={homeClicked}/>
            <ChannelNavButton title = "Playlists" onClick={playlistClicked}/>
            <ChannelNavButton title = "Channels" onClick={homeClicked}/>
            <ChannelNavButton title = "About" onClick={homeClicked}/>

            </div>
        </div>
    )
}

export default ChannelNavMenu;