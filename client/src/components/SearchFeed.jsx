import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI, searchVideosFromApiYoutube } from "../apiFetch/fetchFromAPI";
import FeedVideos from "./feedVideos/FeedVideos";


//this is to leave space for miniSidebar
const marginLeftRight = { xs: "0px", sm800: "40px", md1100: "70px" }

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const [nextPageToken, setNextPageToken] = useState("default");
  const [xxx,setXxx] = useState("lol")

  useEffect(()=>{
    console.log("nextPageToken changed",nextPageToken)
  },[nextPageToken])

  const handleScroll = async () => {
    //console.log("handleScroll called")
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

    if (bottom) {
      console.log('scrolled at the bottom');
      try {
        const pageTOken = nextPageToken; console.log("nextPageToken handleScroll",nextPageToken)
        const res = await searchVideosFromApiYoutube(searchTerm, pageTOken)
        console.log("videos currVidArr is", videos)
        const videoOnlyArr = res.items; const currVidArr = videos; videoOnlyArr.push(...currVidArr)
        
       
        console.log("SearchFeed fetch success:", videoOnlyArr)
        setVideos(videoOnlyArr)
        const pageTokenNext = res.nextPageToken
        if (pageTokenNext) { setNextPageToken(pageTokenNext) }
      } catch (err) {
        console.log("err searchVideosFromApiYoutube infinteScroll pageToken", err)
      }
    }

  };
  useEffect(() => {
    

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])



  useEffect(async () => {
    try {
      const res = await searchVideosFromApiYoutube(searchTerm)
      console.log("searchVideosFromApiYoutube res", res, res.nextPageToken)
      const videoOnlyArr = res.items
      console.log("SearchFeed fetch success:", videoOnlyArr)
      setVideos(videoOnlyArr)

      const pTokenLol = res.nextPageToken
      if (pTokenLol) { setNextPageToken(pTokenLol); console.log("pageTokenNext oke", pageTokenNext) }
      
    } catch (err) {
      console.log("SearchFeed fetch error: ", err)
    }
  }, [searchTerm]);


  return (
    <Box p={2} minHeight="95vh" 
      //marginLeftRight leave space for miniSidebar when screen width >= 800px
      sx={{ marginLeft: marginLeftRight, marginRight: marginLeftRight, overflowY: "scroll", height: "auto" }}>
      <Box display="flex" sx={{ height: "100%" }}>
        <div style={{ overflowY: "scroll", height: "100%" }}>
          {<FeedVideos videos={videos} />}
        </div>


        {/* <Box sx={{ mr: { sm: '0' } }}/>*/}
        {/* {<FeedVideos videos={videos} />} */}
      </Box>
    </Box>
  );
};

export default SearchFeed;
