import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, VideoCard, Loader } from "..";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const ChannelVideos = ({ direction = "row", flexWrap = "wrap" }) => {

    const [videoArr] = useOutletContext()

    console.log("videoArr is", videoArr)
    return (
        
        (videoArr == null) ? <Loader/> :

        <Stack direction={direction} flexWrap={flexWrap} justifyContent="center" gap={2}>
            {videoArr.map((item, idx) => (
                <Box key={idx}>
                    {item.id.videoId && <VideoCard video={item} />}
                    {item.id.channelId && <ChannelCard channelDetail={item} />}
                </Box>
            ))}
        </Stack>
            
    );
}

export default ChannelVideos;
