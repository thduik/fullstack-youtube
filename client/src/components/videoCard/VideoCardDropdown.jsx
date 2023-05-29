import { useState } from 'react';
import { Stack } from "@mui/material";
// import './index.css'

import { useSelector, useDispatch } from 'react-redux'
import VerticalThreeDotIcon from '../../icons/VerticalThreeDotIcon';
import SaveToPlaylistIcon from '../../icons/SaveToPlaylistIcon';


const backgroundColor = "rgba(0,0,0,0)" //important because all elements being transparent allow effects to work
const totalWidth = "34px"
const buttonFontColor = "#3ea6ff"


const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-140px"
const dropdownBackgroundColor = "rgba(0,0,0,0)"
const wrapperStyle = {
    width: totalWidth, paddingTop: "3px",
    paddingLeft: "3px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0)"
    ,marginLeft:"10px"
}
const accountIconDivStyle = {
    backgroundColor: "rgba(0,0,0,0)", width: totalWidth, display: "flex",
    flexDirection: "row", marginLeft:"-5px", paddingRight:"10px"
}

const dropdownDivStyle = {
    position: "fixed", justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft,
    border: "1px solid gray",
    padding: "5px 6px 2px 6px", borderRadius: "22px"
    ,marginTop:"-80px"
}

function VideoCardDropdown() {
    const [showDropdown, setShowDropdown] = useState(false)
    
    const dispatch = useDispatch()
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)

    



    const toggleMenuDisplay = () => {
        const newState = !showDropdown
        setShowDropdown(newState)
    }
    return (
        <div className="comp-wrapper" style={wrapperStyle}>
            <button className="sign-in" style={{ border: "none" }} onClick={toggleMenuDisplay}>
                <div style={accountIconDivStyle}>
                    <VerticalThreeDotIcon/>
                </div>

            </button>

            <div style={{...dropdownDivStyle, borderBottom:"1px solid gray"
            ,display: showDropdown ? "flex" : "none", flexDirection:"column"}} >
                <div>
                    <SaveToPlaylistIcon/>
                    <button>Save To Playlist</button>
                </div>
                <div>
                    <SaveToPlaylistIcon/>
                    <button>Button 1 hehehe</button>
                </div>
               
            </div>
        </div>

    );
}

export default VideoCardDropdown;