import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import { useState } from "react";
import { Sidebar } from "./components";
import { useSelector, useDispatch } from 'react-redux'
// import { fetchFromAPI } from "./utils/fetchFromAPI";
// import { useEffect } from "react";

import {changeShowSidebar} from './features/uiState/uiStateSlice.js'

import MiniSidebar from './components/miniSidebar/MiniSidebar'

const App = () => {
  const dispatch = useDispatch()

  const showSidebar = useSelector((state)=>state.uiState.showSidebar)

  // const [showSidebar, setShowSidebar] = useState(true)
  



  return (

    <BrowserRouter>
      
        
        {showSidebar ? <Sidebar /> : null}
        <MiniSidebar/>
        <Box sx={{ backgroundColor: '#000' }}>

          <Navbar  />

          <Routes>
            <Route exact path='/' element={<Feed showSidebar={showSidebar} />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
          </Routes>
        </Box>
    </BrowserRouter>

  )


}
export default App;
