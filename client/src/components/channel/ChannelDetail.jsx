import React, { useState, useEffect } from "react";
import { Routes,Route, useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Outlet } from "react-router"
import { Videos, ChannelCard } from "..";
import { fetchFromAPI } from "../../apiFetch/fetchFromAPI";
import ChannelNavMenu from "./ChannelNavMenu";


const ChannelDetail = ({basePath, isUser=false}) => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate()
  const { userId,id } = useParams();

  useEffect(() => {
    console.log("ChannelDetail calling api useEffect")
    const fetchResults = async () => {
      if (id) {
        const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
        console.log("ChannelDetail channeldata is:", data)
        setChannelDetail(data?.items[0]);
        const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&maxResults=10`);
        console.log("ChannelDetail videoData is", videosData)
        setVideos(videosData?.items);
      }
     
    };

    fetchResults();
  }, [userId]);

  const clickedNavMenu = (idx) => {
    // if (idx==0) { //home clicked
    //   navigate(basePath)
    // }
    if (idx==1) { if (!isUser) {navigate(`${basePath}${id}/videos`) } }
    if (idx==3) {navigate(`${basePath}${userId}/playlists`)}
  }
  return (
    
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height: '70px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <ChannelNavMenu onClick={clickedNavMenu}/>
      <div style={{paddingTop:"5px",
        backgroundColor:"rgba(0,0,0,0)",display:"flex",justifyContent:"center"}}>
          <Outlet context={[videos]}/>
       
          {/* <Route path={`/channel/:id/videos`} element={ <Videos videos={videos} />} /> */}
    
       
      </div>
      
    </Box>
      );
};

      export default ChannelDetail;
