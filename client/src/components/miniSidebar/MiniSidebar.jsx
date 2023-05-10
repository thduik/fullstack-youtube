import React from "react";
import { Stack } from "@mui/material";
import { miniCategories } from "../../utils/constants";

const MiniSidebar = (props) => {
    const barButtons = miniCategories.map((obj) => {
        //{ name: 'New', icon: <HomeIcon />, },
        return (
            <div>
                <p>{obj.name}</p>
                <button onClick={handleClick(obj.name)}>
                    {obj.icon}
                </button>
            </div>

        )
    })
    return (
        <Stack direction="column">
            {barButtons}
        </Stack>
    )
}

export default MiniSidebar