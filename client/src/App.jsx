import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, SearchFeed, Navbar, Feed } from './components';
import VideoDetail from "./components/videoDetail/VideoDetail";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'


import {changeShowSidebar} from './features/uiState/uiStateSlice.js'

import MiniSidebar from './components/miniSidebar/MiniSidebar'
import { useEffect } from "react";
import { login } from "./features/user/userSlice";



const App = () => {
  const dispatch = useDispatch()

  const showSidebar = useSelector((state)=>state.uiState.showSidebar)
  const showMiniSidebar = useSelector((state)=>state.uiState.showMiniSidebar)

  const isDev = import.meta.env.DEV
  console.log("import.meta.env.DEV:", isDev)
  const baseUrl = isDev ? '/testapp' : '/'
  // const [showSidebar, setShowSidebar] = useState(true)
  useEffect(()=>{
    cookieLogin((resJson)=>{
      dispatch(login(resJson))
    })
  },[])


 
  return (

    <BrowserRouter>
      
        {/* sidebar needs transition and animation */}
        {showSidebar ? <Sidebar /> : null}

        {/* miniSidebar is finished, does not need animation or transition */}
        {showMiniSidebar ? <MiniSidebar/> : null}
        <Box sx={{ backgroundColor: '#000' }}>

          <Navbar  />
          <div style={{paddingTop:'80px'}}>
          <Routes>
            <Route exact path='/' element={<Feed showSidebar={showSidebar} />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
          </Routes>
          </div>
        </Box>
    </BrowserRouter>

  )


}
export default App;
