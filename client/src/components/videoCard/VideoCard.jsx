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
  , xs450: '96vw', 
  md1000: "290px", lg: "370px"
}

// const widthStyle = { xs:"auto" }
const videoDetailWidth = {
  xs:'auto' //, md1000: "300px", lg: "370px"
}
const VideoCard = ({ video: { id: { videoId }, snippet },isVideoDetail }) => {
  const [width, setWidth] = useState(0) //window.innerWidth, viewport width
  const [horizontalCard, setHorizontalCard] = useState(false) //horizontal videoCard like in original youtubeapp
  useEffect(()=>{
    if (width < 1000 && width >= 450) { setHorizontalCard(true)} 
    else { setHorizontalCard(false) }
    // console.log("horizontalCard",horizontalCard)
  },[width]) 
  useEffect(() => {
    
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      console.log("updating width");
    };
    const lolwidth = window.innerWidth;
    if (lolwidth < 1000 && lolwidth > 440) { setHorizontalCard(true)} 
    else { setHorizontalCard(false) }
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
      backgroundColor:"yellow",
      width:isVideoDetail ? videoDetailWidth : widthStyle,
      boxShadow: "none", borderRadius: 0,
      margin:horizontalCard ? "0px 30px 0px 30px" : "0"
    }}>

      <Link to={videoId ? `/watch?v=${videoId}` : `/watch?v=cV2gBU6hKfY`}>
        <CardMedia  image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}

          // sx={{ width: { xs: '100%', sm: '358px'}, 
          sx={{
            // width: isVideoDetail ? videoDetailWidth  : widthStyle,
            // width: horizontalCard ? "100%" : "100%",
            width:horizontalCard ? "calc(220px + 12vw)" : "100%",
            height: horizontalCard ? "calc(130px + 7vw)" : {xs:"140px",md1000:"170px"},
           
            
          }}
        />
      </Link>

      <div style={{width:"auto"}}>

      
      <CardContent sx={{ backgroundColor: "black", 
      height: horizontalCard ? 
      'calc(90px + 7vw)' : '106px' }}>

        <div style={{
          display: "flex", flexDirection: "row", width: "100%",
          justifyContent: "space-between"
        }}>
          <Link to={videoId ? `/watch?v=${videoId}` : demoVideoUrl} >
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            </Typography>
          </Link>
          <div style={{marginRight:"0px", width:"30px"}}>
            <VideoCardDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown}
            saveVideoToPlaylist={startSaveVideoToPlaylist} />
          </div>
        </div>

        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
          {horizontalCard ? 
          <p style={{fontSize:"12px",color:"rgba(255,255,255,0.6)",marginTop:"6px"}}>
            {snippet?.description || "nullDesc"}</p> 
        : null}
        </Link>
      </CardContent>
      </div>

    </Stack>

  )
}

export default VideoCard