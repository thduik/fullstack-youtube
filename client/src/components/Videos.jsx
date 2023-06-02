import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction="row", flexWrap="wrap"}) => {
  if(!videos?.length) return <Loader />;
  
  return (
    // <div>
    //   {videos.map((item, idx) => (
    //     <div key={idx}>
    //       {item.id.videoId && <VideoCard video={item} /> }
    //       {item.id.channelId && <ChannelCard channelDetail={item} />}
    //     </div>
    //   ))}
    // </div>
    <Stack direction={direction} flexWrap={flexWrap} justifyContent="center" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} /> }
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
