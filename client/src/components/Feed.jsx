import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import FeedVideos from "./feedVideos/FeedVideos";
import Sidebar from "./sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'

const backgroundColor = "black"
const Feed = ({videos}) => {
  const selectedCategory = useSelector((state)=>state.appData.selectedCategory)
  
  return (
    <Stack 
    //stack of sidebar and main feed
    //  sx={{ flexDirection: { sx: "column", md: "row" } }}>
    sx={{ flexDirection: "row",backgroundColor:backgroundColor }}>
      <Box style={{backgroundColor:backgroundColor, border:"0px solid blue"
        }} p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      
        <FeedVideos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
