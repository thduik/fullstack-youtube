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
import { getVideosOfPlaylist } from "../../apiFetch/playlistApi";
import { changeIsStreaming, setVideoArray, setStreamedPlaylist } from "../../features/appData/playlistStreamSlice"
const VideoDetail = () => {
  const { id } = useParams() //id = videoid
  useEffect(() => { console.log("VideoDetail id", id) }, [id])
  const [searchParams, setSearchParams] = useSearchParams();
  const { videoArr, streamedPlaylist, isStreaming } = useSelector(state => state.playlistStream);
  const [playlistId, setPlaylistId] = useState(null)
  const dispatch = useDispatch()
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  useEffect(() => {
    return () => {//unmount 
      dispatch(changeIsStreaming(true))
    }

  }, [])

  useEffect(() => {
    const playlistIdd = searchParams.get("playlist")
    if (playlistIdd) { setPlaylistId(playlistIdd) }
  }, [searchParams])

  useEffect(() => {
    if (!playlistId || isStreaming) { return }

    getVideosOfPlaylist(playlistId, (videoArr) => {
      console.log("getVideosOfPlaylist success", videoArr)

      videoArr.sort((a, b) => a.createdAt - b.createdAt)
      dispatch(changeIsStreaming(true))
      dispatch(setVideoArray(videoArr))
      dispatch(setStreamedPlaylist(playlist))

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

    fetchFromAPI(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`)
      .then((data) => {
        console.log("videoStatisticsIs: ", data)
        setVideoDetail(data.items[0])
      })

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box sx={{ padding: "0px 10px 10px 30px" }} minHeight="95vh">
      <Stack direction={{ xs: "column", md1: "row" }} >
        <Box flex={1}>
          {/* <Box sx={{ width: "100%", position: "sticky", top: "86px" }}> */}
          <Box sx={{ width: "100%", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
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
        <div>
          {/* <PlaylistStreamMenu currentVideoId={id} /> */}
          {playlistId ? <PlaylistStreamMenu currentVideoId={id} /> : null}
          <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
            <Videos videos={videos} direction="column" />
          </Box>
        </div>

      </Stack>
    </Box>
  );
};

export default VideoDetail;
