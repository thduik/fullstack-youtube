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
  xs: "100%"   //`${cardWidthSmall}px`
  , xs450: 'calc(100vw - 60px)',
  md1000: "290px", lg: "370px"
}

// const widthStyle = { xs:"auto" }
const videoDetailWidth = {
  xs: 'auto' //, md1000: "300px", lg: "370px"
}
const VideoCard = ({ video: { id: { videoId }, snippet }, isVideoDetail }) => {
  const [width, setWidth] = useState(0) //window.innerWidth, viewport width
  const [horizontalCard, setHorizontalCard] = useState(false) //horizontal videoCard like in original youtubeapp
  useEffect(() => {
    if (width < 1000 && width >= 450) { setHorizontalCard(true) }
    else { setHorizontalCard(false) }
    // console.log("horizontalCard",horizontalCard)
  }, [width])
  useEffect(() => {

    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      // console.log("updating width");
    };
    const lolwidth = window.innerWidth;
    if (lolwidth < 1000 && lolwidth > 440) { setHorizontalCard(true) }
    else { setHorizontalCard(false) }
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions)

  }, []);
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)
  console.log("VideoCardisVideoDetail", isVideoDetail)
  const startSaveVideoToPlaylist = () => {
    console.log("startSaveVideoToPlaylist called")
    setShowDropdown(false)

    // console.log("snippet is", snippet)
    if (!snippet) { return }
    dispatch(changeSelectedVideo({ ...snippet, videoId: videoId }))
    dispatch(changeShowPlaylistSelectDropdown(true))
  }
  const closeMenuFunc = () => {
    console.log("closeMenuFunc called")
    dispatch(changeShowPlaylistSelectDropdown(false))
  }
  return (
    <Stack direction={horizontalCard ? "row" : "column"}
      sx={{

        backgroundColor: "none",
        width: isVideoDetail ? videoDetailWidth : widthStyle,
        boxShadow: "none", borderRadius: 0,
        margin: horizontalCard ? "0px 30px 0px 30px" : "0"
        // ,width:"calc(100vw - 60px)"
      }}>

      <Link to={videoId ? `/watch?v=${videoId}` : `/watch?v=cV2gBU6hKfY`}>
        <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}

          // sx={{ width: { xs: '100%', sm: '358px'}, 
          sx={{
            // width: isVideoDetail ? videoDetailWidth  : widthStyle,
            // width: horizontalCard ? "100%" : "100%",
            width: horizontalCard ? "calc(120px + 16vw)" : "100%",
            height: horizontalCard ? "calc(75px + 9vw)" : { xs: "140px", md1000: "170px" },


          }}
        />
      </Link>

      <div style={{ width: "100%" }}>


        <CardContent sx={{
          backgroundColor: "black",
          height: horizontalCard ? 'calc(35px + 9vw)' : '106px'
          , width: "auto", margin: "0px"
        }}>

          <div style={{
            display: "flex", flexDirection: "row", marginBottom: "4px",
            justifyContent: "space-between", margin: "0px"
            ,backgroundColor:"none"
            , width: horizontalCard ? "auto" : "100%"
          }}>
            <Link to={videoId ? `/watch?v=${videoId}` : demoVideoUrl} >
              <Typography variant="subtitle1" fontWeight="bold" color="#FFF" lineHeight={"1.5"} fontSize={"14px"}>
                {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
              </Typography>
            </Link>
            {
              horizontalCard ? null :
                <div style={{ marginRight: "0px", width: "50px" }}>
                  <VideoCardDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown}
                    saveVideoToPlaylist={startSaveVideoToPlaylist} />
                </div>
            }
          </div>
          <div style = {{width:"auto", lineClamp:"2"}}>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
              {/* <Typography variant="subtitle2" color="gray" textOverflow={"clip"} overflow={"hidden"}>  */}



              <p style={{ fontSize: "13px", color: "white", fontWeight: "bold" }}>

                {snippet?.channelTitle.substring(0, 100) || demoChannelTitle}
                <span>
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </span>
              </p>


              {/* </Typography> */}
              {horizontalCard ?
                <div style={{ width:horizontalCard ? "auto" : "100%"
                , maxWidth: "45vw", minWidth: "36vw", overflow: "hidden",lineClamp:"2" }}>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "9px", lineHeight: "1.5", lineClamp:"2" }}>
                    {snippet?.description.substring(0, 120) || "nullDesc"}</p>
                </div>
                : null}

            </Link>
          </div>
        </CardContent>
      </div> {horizontalCard ?
        <div style={{ marginRight: "0px", width: "auto", backgroundColor: "green" }}>
          <VideoCardDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown}
            saveVideoToPlaylist={startSaveVideoToPlaylist} />
        </div>
        : null
      }
    </Stack>

  )
}

export default VideoCard