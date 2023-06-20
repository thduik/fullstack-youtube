import React from "react";
import { Stack } from "@mui/material";
import { miniCategories } from "../../utils/constants";
import './index.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MiniSidebar = ({backgroundColor="black",buttonBackgroundColor="rgba(0,0,0,0)"}) => {
    const { userId } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const nameToUrlMap = {
        "Home":"/",
        "Shorts":"/search/tyler1",
        "Subscriptions":"/",
        "Library":"/",
        "Playlists":userId ? `user/custom/${userId}/playlists` : '/'
    }

    const handleClick = (name) => {
        const pathurl = nameToUrlMap[name]
        console.log("handleClickMiniSidebar called", pathurl)
        if (pathurl) {navigate(pathurl)}
    }

    const pMarginLeftMap = (name)=>{
        const mapObj = {
            "Home":"14px", "Shorts":"13px", "Subscriptions":"0", "Library":"12px", "Playlists":"9px"
        }
        return mapObj[name] || "4px"
    }
    const barButtons = miniCategories.map((obj) => {
        //{ name: 'New', icon: <HomeIcon />, },
        return (
            <div 
                className="buttonWrapper"
                style={{
                // backgroundColor:backgroundColor,
                paddingLeft:"0px",
                paddingTop:"10px",
                paddingRight:"45px",
                paddingBottom:"14px",
                marginLeft:"8px",
                marginTop:"5px",
                borderRadius:"10px",
                border:"none",
            }}>
                <button style={{
                    backgroundColor:buttonBackgroundColor, border:"none"
                }} onClick={ ()=>{handleClick(obj.name)} }>
                    <div className="buttonWrapper" style={{paddingLeft:"5px"}}>
                        {obj.icon}
                    </div>
                    
                </button>
                <p style={{color:"white", fontSize:"9px",
                textAlign:"right", marginLeft:pMarginLeftMap(obj.name), lineHeight:"0.5"
            }}>
                {obj.name}
                </p>
            </div>

        )
    })
    return (
        <div className = "wrapper"
         style={{float:"left", position:"fixed", zIndex:1,
        marginTop:"60px",backgroundColor:"black"}}>
        <Stack direction="column"
        sx={{ width: "63px"}}>
            {barButtons}
        </Stack>
        </div>
    )
}

export default MiniSidebar