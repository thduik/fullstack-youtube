import ChannelNavButton from "./ChannelNavButton";



const ChannelNavMenu = ({channel}) => {
    const homeClicked = () => {console.log("homeClicked")}
    return (
        <div style={{
            height:"40px", width:"100%", display:"flex", flexDirection:"row"}}>
            <div style={{margin:"auto", backgroundColor:"green"
                ,display:"flex", flexDirection:"row"}}>    
            <ChannelNavButton title = "Home" onClick={homeClicked}/>
            <ChannelNavButton title = "Video" onClick={homeClicked}/>
            <ChannelNavButton title = "Shorts" onClick={homeClicked}/>
            <ChannelNavButton title = "Playlists" onClick={homeClicked}/>
            <ChannelNavButton title = "Channels" onClick={homeClicked}/>
            <ChannelNavButton title = "About" onClick={homeClicked}/>

            </div>
        </div>
    )
}

export default ChannelNavMenu;