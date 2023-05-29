import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI, searchGetFromApi, searchVideosFromApiYoutube } from "../utils/fetchFromAPI";
import  FeedVideos  from "./feedVideos/FeedVideos";


//this is to leave space for miniSidebar
const marginLeftRight = {xs:"0px",sm800:"40px",md1100:"70px"}

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(async() => {
    try {
      const res = await searchVideosFromApiYoutube(searchTerm)
      console.log("SearchFeed fetch success:", res.items)
      // for (var i=0;i<2;i++) {
      //   const resObject = res.items[i]
      //   console.log("res number",i, "id is", resObject.id.kind,resObject.id.kind == "youtube#video")
      // }
      const videoOnlyArr = res.items.filter(obj=>obj.id.kind == "youtube#video")
      // console.log("videoOnlyArr[0]",videoOnlyArr[0],videoOnlyArr[1])
      setVideos(videoOnlyArr)
    } catch(err) {
      console.log("SearchFeed fetch error: ", err)
    }    
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh" 
    //marginLeftRight leave space for miniSidebar when screen width >= 800px
    sx={{marginLeft:marginLeftRight, marginRight:marginLeftRight}}>
      <Box display="flex">
        <Box sx={{ mr: { sm: '0' } }}/>
        {<FeedVideos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
