import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import Sidebar from "./sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'

const Feed = (props) => {
  const selectedCategory = useSelector((state)=>state.appData.selectedCategory)
  // // const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  // useEffect(() => {
  //   setVideos(null);

  //   fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
  //     .then((data) => setVideos(data.items))
  //   }, [selectedCategory]);

  return (
    <Stack style={{backgroundColor:"brown"}}
    //stack of sidebar and main feed
    //  sx={{ flexDirection: { sx: "column", md: "row" } }}>
    sx={{ flexDirection: "row" }}>

      <Box style={{backgroundColor:"black"}} sx={{ height: { sx: "auto", md: "92vh" }, px: { sx: 0, md: 2 } }}>
      {/* props.showSidebar toggles sidebar display on/off, triggered by Navbar burger menu button */}
        {/* {props.showSidebar ? <Sidebar selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} /> : null} */}
        
        
        
        {/* <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          
        </Typography> */}
      </Box>

      <Box style={{backgroundColor:"black", border:"0px solid blue"
        }} p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        {/* <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white", marginLeft:"40px" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videosss</span>
        </Typography> */}

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
