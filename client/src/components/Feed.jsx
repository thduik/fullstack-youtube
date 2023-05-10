import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import MiniSidebar from './miniSidebar/MiniSidebar'

const Feed = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
    }, [selectedCategory]);

  return (
    <Stack style={{backgroundColor:"brown"}}
    //stack of sidebar and main feed
    //  sx={{ flexDirection: { sx: "column", md: "row" } }}>
    sx={{ flexDirection: "row" }}>

      <Box style={{backgroundColor:"black"}} sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
      {/* props.showSidebar toggles sidebar display on/off, triggered by Navbar burger menu button */}
        {/* {props.showSidebar ? <Sidebar selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} /> : null} */}
        
        
        
        {/* <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          
        </Typography> */}
      </Box>

      <Box style={{backgroundColor:"green"}} p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videosss</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
