import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import FeedVideos from "./feedVideos/FeedVideos";
import Sidebar from "./sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'

const backgroundColor = "black"
const Feed = (props) => {
  const selectedCategory = useSelector((state)=>state.appData.selectedCategory)
  // // const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  // useEffect(() => {
  //   setVideos(null);
  //   console.log("selectedCategory is", selectedCategory)
  //   fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
  //     .then((data) => setVideos(data.items))
  //   }, [selectedCategory]);

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
