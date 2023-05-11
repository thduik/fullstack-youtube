import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(async() => {
    try {
      const res = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      console.log("SearchFeed fetch success:", res.items)
      for (var i=0;i<30;i++) {
        const resObject = res.items[i]
        console.log("res number",i, "id is", resObject.id.kind,resObject.id.kind == "youtube#video")
      }
      const videoOnlyArr = res.items.filter(obj=>obj.id.kind == "youtube#video")
      setVideos(videoOnlyArr)
    } catch(err) {
      console.log("SearchFeed fetch error: ", err)
    }
    // fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
    //   .then((data) => setVideos(data.items))
      
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      {/* <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography> */}
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
