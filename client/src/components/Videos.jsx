import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";
import { useOutletContext } from "react-router-dom";

const Videos = ({ videos, direction = "row", flexWrap = "wrap", isVideoDetail=false }) => {
  if(!videos?.length) return <Loader />;
  
  return (
    
    <Stack direction={direction} flexWrap={flexWrap} justifyContent="center" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} isVideoDetail = {isVideoDetail}/>}
          {item.id.channelId && <ChannelCard channelDetail={item} isVideoDetail = {isVideoDetail} />}
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
