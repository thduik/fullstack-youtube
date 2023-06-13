import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";
import { useOutletContext } from "react-router-dom";

const Videos = ({ videos, direction = "row", flexWrap = "wrap", isPlaylistStream=false }) => {
  if(!videos?.length) return <Loader />;
  
  return (
    
    <Stack direction={direction} flexWrap={flexWrap} justifyContent="center" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} isPlaylistStream = {isPlaylistStream}/>}
          {item.id.channelId && <ChannelCard channelDetail={item} isPlaylistStream = {isPlaylistStream} />}
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
