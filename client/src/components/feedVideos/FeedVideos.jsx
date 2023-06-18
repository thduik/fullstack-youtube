import React from "react";
import { Stack, Box } from "@mui/material";

import { Loader, VideoCard, ChannelCard } from "../";
import { useEffect } from "react";

const FeedVideos = ({ videos, direction }) => {
  // if(!videos?.length) return <Loader />;
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log("bottom handleScroll is", bottom)
    if (bottom) { 
      console.log("SeachFeed scrolled to bottom")
     }
  }
  if(!videos?.length) return null;
  return (
    <Stack onScroll={handleScroll} 
    direction={direction || "row"} flexWrap="wrap" justifyContent="center" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
       
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} /> }
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
}

export default FeedVideos;