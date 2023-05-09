import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import { useState } from "react";

const App = () => {
  
  const [showSidebar, setShowSidebar] = useState('1')
  const clickedBurgerMenu = (e) => {
    setShowSidebar(!showSidebar)
  }
  
  
return (

    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000' }}>
        <Navbar clickedBurgerMenu={clickedBurgerMenu} />
        <Routes>
          <Route exact path='/' element={<Feed showSidebar={showSidebar}/>} />
          <Route path='/video/:id' element={<VideoDetail />} />
          <Route path='/channel/:id' element={<ChannelDetail />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>

    )


}
export default App;
