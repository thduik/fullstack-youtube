import React from "react";
import { Stack } from "@mui/material";
import { miniCategories } from "../../utils/constants";
import './index.css'

const MiniSidebar = ({backgroundColor="black",buttonBackgroundColor="rgba(0,0,0,0)"}) => {
    const handleClick = (name) => {

    }

    const pMarginLeftMap = (name)=>{
        const mapObj = {
            "Home":"14px", "Shorts":"13px", "Subscriptions":"0", "Library":"12px"
        }
        return mapObj[name]
    }
    const barButtons = miniCategories.map((obj) => {
        //{ name: 'New', icon: <HomeIcon />, },
        return (
            <div 
                className="buttonWrapper"
                style={{
                // backgroundColor:backgroundColor,
                paddingLeft:"2px",
                paddingTop:"10px",
                paddingRight:"45px",
                paddingBottom:"14px",
                marginLeft:"5px",
                marginTop:"5px",
                borderRadius:"10px",
                border:"none",
            }}>
                <button style={{
                    backgroundColor:buttonBackgroundColor, border:"none"
                }} onClick={handleClick(obj.name)}>
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