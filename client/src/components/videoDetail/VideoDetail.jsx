import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, createTheme } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "..";
import { fetchFromAPI } from "../../apiFetch/fetchFromAPI";

import { useSelector, useDispatch } from 'react-redux'

import { changeShowMiniSidebar } from '../../features/uiState/uiStateSlice.js'
import PlaylistStreamMenu from "../playlist/PlaylistStreamMenu";
import { getVideosOfPlaylist, getPlaylistDetail } from "../../apiFetch/playlistApi";
import { changeIsStreaming, setVideoArray, setStreamedPlaylist } from "../../features/appData/playlistStreamSlice"
import VideoStats from "./VideoStats";
import VideoComments from "./VideoComments";
import DescriptionDisplay from "./DescriptionDisplay";

const playerBoxWidth = { xs: "100%", sm770: "90%", md1000: "84%" }

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
    console.log("")
    return () => {//unmount 
      dispatch(changeIsStreaming(false))
    }
  }, [])

  useEffect(() => {
    if (videoDetail?.snippet) { 
      console.log("videoDetailSnippet description", videoDetail.snippet.description.split(/\r?\n/) )
      console.log("videoDetailSnippet", videoDetail.snippet)
     }
  }, [videoDetail])
 
  useEffect(() => {
    const videoId = searchParams.get("v")
    if (!videoId) { return }
    console.log("VideoDetail searchParams.get(v)", searchParams.get("v"))
    setVideoId(videoId)
    const playlistIdd = searchParams.get("playlist")
    if (playlistIdd) { setPlaylistId(playlistIdd) }

  }, [searchParams])

  useEffect(() => {
    if (!playlistId || isStreaming) { return }

    getPlaylistDetail(playlistId, (playlistData) => {
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
    if (!id) { return }
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
    console.log("changedPlaylistVideo called", video, "idx key", key)

    setVideoId(video.videoId)
    setPlaylistVideoIdx(key)
  }

  const videoPlayEnded = () => {
    if (playlistVideoIdx < videoArr.length - 1) {
      setVideoId(videoArr[playlistVideoIdx + 1].videoId)
      setPlaylistVideoIdx(playlistVideoIdx + 1)
    }
  }


  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle, description, publishedAt }, statistics: { viewCount, likeCount, commentCount } } = videoDetail;


  return (

    <Box sx={{ padding: "0px 10px 10px 30px" }} minHeight="95vh">
      <Stack direction={{ xs: "column", md1000: "row" }} >
        <Box flex={1}>
          {/* <Box sx={{ width: "100%", position: "sticky", top: "86px" }}> */}
          <Box sx={{ width: playerBoxWidth, top: "86px", margin: "auto" }}>
            <ReactPlayer playing={id ? true : false} muted={true} onEnded={videoPlayEnded} url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <VideoStats title={title} channelTitle={channelTitle} channelId={channelId} viewCount={viewCount} likeCount={likeCount} publishedAt={publishedAt} />
            <div style={{ padding: "14px", marginTop: "10px", color: "white" }} 
            >
              {/* <pre style={{color:"white", fontSize:"13px", lineHeight:"1.5"}}>{['a','b','c']}</pre>
              {description.split('\\n')} */}
              <DescriptionDisplay text={description}/>
            </div>
            <VideoComments commentCount={commentCount} videoId={id} />
          </Box>

        </Box>

        <Box sx={{ width: { xs: "100%", md1000: "350px", md1200: "400px" }, paddingRight: "12px" }}>

          {playlistId ? <PlaylistStreamMenu currentVideoId={id} selectPlaylistVideo={changedPlaylistVideo} /> : null}
          < Box px={2} sx={{ width: "100%", marginTop: "30px" }}
            py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
            <Videos videos={videos} direction="column" isVideoDetail={true} />

          </Box>
        </Box>

      </Stack>
    </Box>

  );
};

export default VideoDetail;
