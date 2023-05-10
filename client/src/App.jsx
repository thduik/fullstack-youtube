import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from './components';
import { useState } from "react";
import { Sidebar } from "./components";
import { useSelector, useDispatch } from 'react-redux'
import { fetchFromAPI } from "./utils/fetchFromAPI";
import { useEffect } from "react";

const App = () => {
  
  const selectedCategory = useSelector()
  // const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
    }, [selectedCategory]);
  
  const [showSidebar, setShowSidebar] = useState('1')
  const clickedBurgerMenu = (e) => {
    setShowSidebar(!showSidebar)
  }
  
  
return (

    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000' }}>
        
        {showSidebar ? <Sidebar selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} /> : null}
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
