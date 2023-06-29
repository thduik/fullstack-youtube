import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import loadable from '@loadable/component'
import { useSelector, useDispatch } from 'react-redux'



import { Navbar } from './components';
const Feed = lazy(() => import('./components/Feed'));
const SearchFeed = loadable(() => import('./components/SearchFeed'));
const ChannelVideos = loadable(() => import('./components/channel/ChannelVideos'));
const ChannelDetail = loadable(() => import('./components/channel/ChannelDetail'));
// import VideoDetail from "./components/videoDetail/VideoDetail";
const VideoDetail = loadable(() => import('./components/videoDetail/VideoDetail'));
// import Sidebar from "./components/sidebar/Sidebar";
const Sidebar = loadable(() => import('./components/sidebar/Sidebar'));
// import PlaylistSelectMenu from "./components/videoCard/PlaylistSelectMenu";
const PlaylistSelectMenu = loadable(() => import('./components/videoCard/PlaylistSelectMenu'));
// import PlaylistsPage from "./components/playlist/PlaylistsPage";
const PlaylistsPage = loadable(() => import('./components/playlist/PlaylistsPage'));


import { changeShowSidebar } from './features/uiState/uiStateSlice.js'

import MiniSidebar from './components/miniSidebar/MiniSidebar'
import { useEffect } from "react";
import { login } from "./features/user/userSlice";
import { cookieLogin } from "./utils/testApi";
import { fetchFromAPI } from "./apiFetch/fetchFromAPI";


import { getPlaylist } from "./apiFetch/playlistApi";
import { setPlaylistArray } from "./features/appData/playlistSlice";

import { fetchPopularVideos } from "./apiFetch/popularApi";



const App = () => {
  const dispatch = useDispatch()

  const showSidebar = useSelector((state) => state.uiState.showSidebar)
  const showMiniSidebar = useSelector((state) => state.uiState.showMiniSidebar)
  const { showPlaylistSelectDropdown } = useSelector((state) => state.uiState)

  const [feedVideos, setFeedVideos] = useState(null);
  const isDev = import.meta.env.DEV
  console.log("import.meta.env.DEV:", isDev)
  // const baseUrl = isDev ? '/testapp' : '/'

  useEffect(() => {
    setFeedVideos(null);
    fetchPopularVideos(false, (resItems) => {
      console.log("fetchPopularVideosApp.jsx", resItems[0])

      setFeedVideos(resItems)
    })
    // fetchFromAPI(`search?part=snippet&q=${'news'}`)
    //   .then((data) => {console.log("searchNews", data.items[0])
    //     setFeedVideos(data.items)})
  }, []);

  // const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    cookieLogin((resJson) => {
      dispatch(login(resJson))
      console.log("resJson is:", resJson)
      //{email,googleid,name,pictureUrl,userId,userName}
      getPlaylist((playlists) => {
        console.log("getPlaylist success", playlists)
        dispatch(setPlaylistArray(playlists))
      })
    })

  }, [])



  return (

    <BrowserRouter>

      {/* sidebar needs transition and animation */}
      <Suspense fallback={<div>FUCK YOU</div>}>
        {showSidebar ? <Sidebar /> : null}
      </Suspense>
      {/* miniSidebar is finished, does not need animation or transition */}
      {showMiniSidebar ? <MiniSidebar /> : null}
      <Box sx={{ backgroundColor: '#000', height: "auto" }}>

        <Navbar />
        <div style={{ paddingTop: '80px', height: "auto" }}>
          {showPlaylistSelectDropdown ? <PlaylistSelectMenu /> : null}
          <Routes>

            <Route exact path='/' element={
              <Suspense fallback={<div></div>}>
                <Feed videos={feedVideos} showSidebar={showSidebar} />
              </Suspense>
            } />

            {/* <Route path='/video/:id' element={<VideoDetail />} /> */}
            <Route path='/watch' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail basePath={"/channel/"} />}>
              <Route path={`videos`} element={<ChannelVideos />} />
            </Route>
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
            <Route path='/user/custom/:userId' element={<ChannelDetail isUser={true} basePath={"/user/custom/"} />} >
              {/* playlist component here */}
              <Route path='playlists' element={<PlaylistsPage />} />

            </Route>
          </Routes>
        </div>
      </Box>
    </BrowserRouter>

  )


}
export default App;
