import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI, searchVideosFromApiYoutube, searchVideosFromApiYoutubeCallback } from "../apiFetch/fetchFromAPI";
import FeedVideos from "./feedVideos/FeedVideos";


//this is to leave space for miniSidebar
const marginLeftRight = { xs: "0px", sm800: "40px", md1100: "70px" }

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const [nextPageToken, setNextPageToken] = useState("defos");
  const [isBottom, setIsBottom] = useState(false)

  useEffect(() => {
    console.log("nextPageToken changed", nextPageToken)
  }, [nextPageToken])
  
  const filterAndSetVideos = (vidArros) => {
    const viszArr = vidArros.filter(o=>o.id.kind == "youtube#video")
    setVideos(viszArr)
  }
  const loadMoreVideos = (pageTOken) => {
    try {
      
      searchVideosFromApiYoutubeCallback(searchTerm, pageTOken, (res) => {
        console.log("videos currVidArr is", videos)
        const videoOnlyArr = res.items; const currVidArr = [...videos]; currVidArr.push(...videoOnlyArr)
        console.log("SearchFeed fetch success:", videoOnlyArr)
        // setVideos(currVidArr)
        filterAndSetVideos(currVidArr)
        const pageTokenNext = res.nextPageToken
        if (pageTokenNext) { setNextPageToken(pageTokenNext) }
      })
    } catch (err) {
      console.log("err searchVideosFromApiYoutube infinteScroll pageToken", err)
    }
  }

  useEffect(()=>{
    if(isBottom) {
      const pageTOken = nextPageToken; console.log("nextPageToken handleScroll", pageTOken)
      loadMoreVideos(pageTOken)
      setIsBottom(false)
    }
  },[isBottom])
  
  useEffect(() => {
    const handleScroll = () => {
      //console.log("handleScroll called")
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      if (bottom) {
        console.log('scrolled at the bottom');
        setIsBottom(true)
        
      }
  
    };
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
      // setVideos(videoOnlyArr)
      filterAndSetVideos(videoOnlyArr)
      const pTokenLol = res.nextPageToken; setNextPageToken(pTokenLol)
      if (pTokenLol) { setNextPageToken(pTokenLol); console.log("nextPageToken oke", pTokenLol) }

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
      </Box>
    </Box>
  );
};

export default SearchFeed;
