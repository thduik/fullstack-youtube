import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

import { ChannelDetail, SearchFeed, Navbar, Feed } from './components';
import VideoDetail from "./components/videoDetail/VideoDetail";
import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'


import {changeShowSidebar} from './features/uiState/uiStateSlice.js'

import MiniSidebar from './components/miniSidebar/MiniSidebar'


// import { getConfig } from "./config";

// const config = getConfig();
// const onRedirectCallback = (appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };

// const providerConfig = {
//   domain: config.domain,
//   clientId: config.clientId,
//   onRedirectCallback,
//   authorizationParams: {
//         redirect_uri: 'http://localhost:3000',
//         audience:'http://localhost:3001/api/external',
//         scope: "read:current_user update:current_user_metadata"
//       }
 
// };
const App = () => {
  const dispatch = useDispatch()

  const showSidebar = useSelector((state)=>state.uiState.showSidebar)
  const showMiniSidebar = useSelector((state)=>state.uiState.showMiniSidebar)

  // const [showSidebar, setShowSidebar] = useState(true)
  


 
  return (

    <BrowserRouter>
      
        {/* sidebar needs transition and animation */}
        {showSidebar ? <Sidebar /> : null}

        {/* miniSidebar is finished, does not need animation or transition */}
        {showMiniSidebar ? <MiniSidebar/> : null}
        <Box sx={{ backgroundColor: '#000' }}>

          <Navbar  />
          <div style={{paddingTop:'75px'}}>
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
