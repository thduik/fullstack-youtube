import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, SearchFeed, Navbar, Feed, ChannelVideos } from './components';
import VideoDetail from "./components/videoDetail/VideoDetail";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'


import { changeShowSidebar } from './features/uiState/uiStateSlice.js'

import MiniSidebar from './components/miniSidebar/MiniSidebar'
import { useEffect } from "react";
import { login } from "./features/user/userSlice";
import { cookieLogin } from "./utils/testApi";
import { fetchFromAPI } from "./apiFetch/fetchFromAPI";
import PlaylistSelectMenu from "./components/videoCard/PlaylistSelectMenu";
import { getPlaylist } from "./apiFetch/playlistApi";
import { setPlaylistArray } from "./features/appData/playlistSlice";
import PlaylistsPage from "./components/playlist/PlaylistsPage";



const App = () => {
  const dispatch = useDispatch()

  const showSidebar = useSelector((state) => state.uiState.showSidebar)
  const showMiniSidebar = useSelector((state) => state.uiState.showMiniSidebar)
  const { showPlaylistSelectDropdown } = useSelector((state) => state.uiState)

  const [feedVideos, setFeedVideos] = useState(null);
  const isDev = import.meta.env.DEV
  console.log("import.meta.env.DEV:", isDev)
  const baseUrl = isDev ? '/testapp' : '/'

  useEffect(() => {
    setFeedVideos(null);
    fetchFromAPI(`search?part=snippet&q=${'news'}`)
      .then((data) => setFeedVideos(data.items))
  }, []);
  
  // const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    cookieLogin((resJson) => {
      dispatch(login(resJson))
      console.log("resJson is:", resJson)
      //{email,googleid,name,pictureUrl,userId,userName}
      getPlaylist((playlists)=>{
        console.log("getPlaylist success", playlists)
        dispatch(setPlaylistArray(playlists))
      })
    })

  }, [])



  return (

    <BrowserRouter>

      {/* sidebar needs transition and animation */}
      {showSidebar ? <Sidebar /> : null}

      {/* miniSidebar is finished, does not need animation or transition */}
      {showMiniSidebar ? <MiniSidebar /> : null}
      <Box sx={{ backgroundColor: '#000' }}>

        <Navbar />
        <div style={{ paddingTop: '80px' }}>
          {showPlaylistSelectDropdown ? <PlaylistSelectMenu/> : null}
          <Routes>
            <Route exact path='/' element={<Feed videos={feedVideos} showSidebar={showSidebar} />} />
            {/* <Route path='/video/:id' element={<VideoDetail />} /> */}
            <Route path='/watch' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail basePath={"/channel"} />}>
              <Route path={`videos`} element={ <ChannelVideos/>} />
            </Route>
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
            <Route path='/user/custom/:userId' element={<ChannelDetail basePath={"/user/custom/"}/>} >
              {/* playlist component here */}
              <Route path='playlists' element={<PlaylistsPage/>}/>
              
            </Route>
          </Routes>
        </div>
      </Box>
    </BrowserRouter>

  )


}
export default App;
