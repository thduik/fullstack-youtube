import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, createTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "..";
import { fetchFromAPI } from "../../apiFetch/fetchFromAPI";

import { useSelector, useDispatch } from 'react-redux'

import { changeShowMiniSidebar } from '../../features/uiState/uiStateSlice.js'
import PlaylistStreamMenu from "../playlist/PlaylistStreamMenu";
import { getVideosOfPlaylist, getPlaylistDetail } from "../../apiFetch/playlistApi";
import { changeIsStreaming, setVideoArray, setStreamedPlaylist } from "../../features/appData/playlistStreamSlice"

const playerBoxWidth = {xs:"100%", sm770:"90%", md1000:"84%"}

const VideoDetail = () => {
  // const { id } = useParams() //id = videoid
  //useEffect(() => { console.log("VideoDetail id", id) }, [id])
  const [searchParams, setSearchParams] = useSearchParams();
  const { videoArr, streamedPlaylist, isStreaming } = useSelector(state => state.playlistStream);
  const [playlistId, setPlaylistId] = useState(null)
  const dispatch = useDispatch()
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [id, setVideoId] = useState(null)
  const [playlistVideoIdx, setPlaylistVideoIdx] = useState(null)
  useEffect(() => {
    return () => {//unmount 
      dispatch(changeIsStreaming(false))
    }
  }, [])

  useEffect(() => {
    const videoId = searchParams.get("v")
    if (!videoId) {return}
    console.log("VideoDetail searchParams.get(v)",searchParams.get("v"))
    setVideoId(videoId)
    const playlistIdd = searchParams.get("playlist")
    if (playlistIdd) { setPlaylistId(playlistIdd) }
    
  }, [searchParams])

  useEffect(() => {
    if (!playlistId || isStreaming) { return }

    getPlaylistDetail(playlistId, (playlistData)=>{
      console.log("getPlaylistDetail success playlistData", playlistData)
      dispatch(setStreamedPlaylist(playlistData))
    })

    getVideosOfPlaylist(playlistId, (videoArr) => {
      console.log("getVideosOfPlaylist success", videoArr)
      videoArr.sort((a, b) => a.createdAt - b.createdAt)
      setVideoId(videoArr[0].videoId)
      setPlaylistVideoIdx(0)
      dispatch(changeIsStreaming(true))
      dispatch(setVideoArray(videoArr))
    }).catch((err) => {
      throw ("err getVideosOfPlaylist", err)
    })
  }, [playlistId])

  useEffect(() => {
    // Anything in here is fired on component mount.
    dispatch(changeShowMiniSidebar(false))
    console.log("VideoDetail useSearchParams playlistId", playlistId)
    return () => {
      dispatch(changeShowMiniSidebar(true))
      // Anything in here is fired on component unmount.
    }
  }, [])

  useEffect(() => {
    if (!id) {return}
    console.log("relatedToVideoId", id)
    fetchFromAPI(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`)
      .then((data) => {
        console.log("videoStatisticsIs: ", data)
        setVideoDetail(data.items[0])
      })
      
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  const changedPlaylistVideo = ({ video, key }) => { //key = index of video in playlistStream.videoArr, we can jump to next video
    console.log("changedPlaylistVideo called",video, "idx key", key)
    
    setVideoId(video.videoId)
    setPlaylistVideoIdx(key)
  }

  const videoPlayEnded = () => {
    if (playlistVideoIdx < videoArr.length-1) {
      setVideoId(videoArr[playlistVideoIdx + 1].videoId)
      setPlaylistVideoIdx(playlistVideoIdx + 1)
    }
  }

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box sx={{ padding: "0px 10px 10px 30px" }} minHeight="95vh">
      <Stack direction={{ xs: "column", md1000: "row" }} >
        <Box flex={1}>
          {/* <Box sx={{ width: "100%", position: "sticky", top: "86px" }}> */}
          <Box sx={{ width: playerBoxWidth, top: "86px", margin:"auto" }}>
            <ReactPlayer playing={id ? true : false} muted={true} onEnded={videoPlayEnded} url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box sx={{width:{xs:"100%",md1000:"350px"}
      }}>
          {playlistId ? <PlaylistStreamMenu currentVideoId={id} selectPlaylistVideo={changedPlaylistVideo}/> : null}
          < Box px={2} sx={{width:"100%"}}
           py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
            <Videos videos={videos} direction="column" isVideoDetail = {true}/>
          </Box>
        </Box>

      </Stack>
    </Box>
  );
};

export default VideoDetail;
