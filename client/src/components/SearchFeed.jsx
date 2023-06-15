import { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI, searchVideosFromApiYoutube } from "../apiFetch/fetchFromAPI";
import FeedVideos from "./feedVideos/FeedVideos";


//this is to leave space for miniSidebar
const marginLeftRight = { xs: "0px", sm800: "40px", md1100: "70px" }

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const ref = useRef(null);
  const ref1 = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      console.log("handleScroll called")
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

      if (bottom) {
        console.log('at the bottom');
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     // Do your stuff here
  //     console.log("handleScroll called")
  //     const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //     console.log("bottom handleScroll is", bottom)
  //     if (bottom) {
  //       console.log("SeachFeed scrolled to bottom")
  //     }
  //   };

  //   ref.current?.addEventListener("scroll", handleScroll);
  //   ref1.current?.addEventListener("scroll", handleScroll);
  //   ref.current?.addEventListener("click", ()=>{console.log("addEventListener click called")})
  //   return () => ref.current?.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(async () => {
    try {
      const res = await searchVideosFromApiYoutube(searchTerm)
      const videoOnlyArr = res.items
      console.log("SearchFeed fetch success:", videoOnlyArr)
      setVideos(videoOnlyArr)
    } catch (err) {
      console.log("SearchFeed fetch error: ", err)
    }
  }, [searchTerm]);

  const handleScroll = (e) => {
    console.log("handleScroll onScroll called")
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log("bottom handleScroll is", bottom)
    if (bottom) {
      console.log("SeachFeed scrolled to bottom")
    }
  }

  return (
    <Box ref={ref} p={2} minHeight="95vh" onScroll={handleScroll}
      //marginLeftRight leave space for miniSidebar when screen width >= 800px
      sx={{ marginLeft: marginLeftRight, marginRight: marginLeftRight, overflowY: "scroll", height: "auto" }}>
      <Box ref={ref} display="flex" sx={{ height: "100%" }}>
        <div style={{ overflowY: "scroll", height: "100%" }}
          ref={ref1} onScroll={handleScroll}>
          {<FeedVideos videos={videos} />}
        </div>


        {/* <Box sx={{ mr: { sm: '0' } }}/>*/}
        {/* {<FeedVideos videos={videos} />} */}
      </Box>
    </Box>
  );
};

export default SearchFeed;
