import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../../utils/constants";
import VideoCardDropdown from './VideoCardDropdown';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeShowPlaylistSelectDropdown } from '../../features/uiState/uiStateSlice';
import { changeSelectedVideo } from '../../features/appData/playlistSlice';



const cardWidthSmall = window.innerWidth - 30
const widthStyle = {
  xs:"100%"   //`${cardWidthSmall}px`
  , sm: '270px', sm770: '290px', md: "320px",
  md1000: "290px", lg: "370px"
}

const videoDetailWidth = {
  xs:'auto' //, md1000: "300px", lg: "370px"
}
const VideoCard = ({ video: { id: { videoId }, snippet },isVideoDetail }) => {
  const [width, setWidth] = useState(0) //window.innerWidth, viewport width
  const [horizontalCard, setHorizontalCard] = useState(false) //horizontal videoCard like in original youtubeapp
  useEffect(()=>{
    if (width < 1000 && width > 440) { setHorizontalCard(true)} 
    else { setHorizontalCard(false) }
  },[width])
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      console.log("updating width");
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions) 

  }, []);
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)
  console.log("VideoCardisVideoDetail",isVideoDetail)
  const startSaveVideoToPlaylist = () => {
    console.log("startSaveVideoToPlaylist called")
    setShowDropdown(false)
    
    // console.log("snippet is", snippet)
    if (!snippet) { return }
    dispatch(changeSelectedVideo({...snippet, videoId:videoId}))
    dispatch(changeShowPlaylistSelectDropdown(true))
  }
  const closeMenuFunc = () => {
    console.log("closeMenuFunc called")
    dispatch(changeShowPlaylistSelectDropdown(false))
  }
  return (
    <Stack direction={horizontalCard ? "row" : "column"}
    sx={{

      width:isVideoDetail ? videoDetailWidth : widthStyle,
      boxShadow: "none", borderRadius: 0
    }}>

      <Link to={videoId ? `/watch?v=${videoId}` : `/watch?v=cV2gBU6hKfY`}>
        <CardMedia  image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}

          // sx={{ width: { xs: '100%', sm: '358px'}, 
          sx={{
            width: isVideoDetail ? videoDetailWidth  : widthStyle,
            height: horizontalCard ? 90 : "auto",
            width: horizontalCard ? 200 : "100%"
            
          }}
        />
      </Link>

      <div style={{width:"auto"}}>

      
      <CardContent sx={{ backgroundColor: "black", height: '106px' }}>
        <div style={{
          display: "flex", flexDirection: "row", width: "100%",
          justifyContent: "space-between"
        }}>
          <Link to={videoId ? `/watch?v=${videoId}` : demoVideoUrl} >
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
          <div style={{marginRight:"-17px"}}>
            <VideoCardDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown}
            saveVideoToPlaylist={startSaveVideoToPlaylist} />
          </div>

        </div>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
      </div>

    </Stack>

  )
}

export default VideoCard