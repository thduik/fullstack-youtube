import React from "react";
import { Stack } from "@mui/material";
import { miniCategories } from "../../utils/constants";
import './index.css'
const MiniSidebar = (props) => {
    const handleClick = (name) => {

    }
    const barButtons = miniCategories.map((obj) => {
        //{ name: 'New', icon: <HomeIcon />, },
        return (
            <div style={{
                backgroundColor:"gray",
                paddingLeft:"20px"
                
            }}>
                <button style={{
                    backgroundColor:"gray", border:"none"
                }} onClick={handleClick(obj.name)}>
                    {obj.icon}
                </button>
                <p style={{color:"white", fontSize:"9px"

            }}>
                {obj.name}
                </p>
            </div>

        )
    })
    return (
        <div style={{float:"left", position:"fixed", zIndex:1,
        marginTop:"60px"}}>
        <Stack direction="column"
        sx={{ width: "60px"}}>
            {barButtons}
        </Stack>
        </div>
    )
}

export default MiniSidebar