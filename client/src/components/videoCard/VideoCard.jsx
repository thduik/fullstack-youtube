import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../../utils/constants";
import VerticalThreeDotIcon from '../../icons/VerticalThreeDotIcon';
import VideoCardDropdown from './VideoCardDropdown';
import PlaylistSelectMenu from './PlaylistSelectMenu';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeShowPlaylistSelectDropdown } from '../../features/uiState/uiStateSlice';



const cardWidthSmall = window.innerWidth - 30
console.log("cardWidthSmall is", `${cardWidthSmall}px`)
const widthStyle = {
  xs: `${cardWidthSmall}px`, sm: '270px', sm770: '290px', md: "320px",
  md1000: "290px", lg: "370px"
}
const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)
  const startSaveVideoToPlaylist = () => {
    console.log("startSaveVideoToPlaylist called")
    setShowDropdown(false)
    dispatch(changeShowPlaylistSelectDropdown(true))
  }
  const closeMenuFunc = () => {
    console.log("closeMenuFunc called")
    dispatch(changeShowPlaylistSelectDropdown(false))
  }
  return (
    <Card sx={{

      width: widthStyle,
      // width: { xs: '100%', sm: '44%', md: "30%", }, 

      boxShadow: "none", borderRadius: 0
    }}>

      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia  image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}

          // sx={{ width: { xs: '100%', sm: '358px'}, 
          sx={{
            width: widthStyle,
            height: 180
            
          }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "black", height: '106px' }}>
        <div style={{
          display: "flex", flexDirection: "row", width: "100%",
          justifyContent: "space-between"
        }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} >
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
      

    </Card>

  )
}

export default VideoCard