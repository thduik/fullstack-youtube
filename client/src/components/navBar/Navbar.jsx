import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../../utils/constants";
import { SearchBar } from "..";
import LiveIcon from "../../icons/LiveIcon";
import NotiIcon from "../../icons/NotiIcon";
import AccountIcon from "../../icons/AccountIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import BurgerMenuIcon from "../../icons/BurgerMenuIcon";
import SearchIcon from "../../icons/SearchIcon";

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { changeShowSidebar } from "../../features/uiState/uiStateSlice";
import LoginDropdown from "../loginDropdown/LoginDropdown";

import BasicDropdown from "../../testComponents/BasicDropdown";
import SmSearchBar from "../searchBar/SmSearchBar";
import { Box } from "@mui/system";



const Navbar = (props) => {
  const [smSearchBarDisplay, setSmSearchBarDisplay] = useState(false)
  const changeSmSearchBarDisplay = () => {
    console.log("changeSmSearchBarDisplay called")
    const newState = !smSearchBarDisplay
    setSmSearchBarDisplay(newState)
  }
  const dispatch = useDispatch()
  const showSidebar = useSelector((state) => state.uiState.showSidebar)
  // const [showSidebar, setShowSidebar] = useState(true)

  const clickedBurgerMenu = (e) => {
    const newState = !showSidebar
    console.log("youtubeIconClicked newState is", newState)
    dispatch(changeShowSidebar(newState))
  }
  const clickedLiveIcon = (e) => {
    console.log("clickedLiveIcon called")
  }
  const clickedNotiIcon = (e) => {
    console.log("clickedNotiIcon called")
  }
  const clickedAccountIcon = (e) => {
    console.log("clickedAccountIcon called")
  }
  return (
    <Stack direction="row" alignItems="center" p={2} sx={{
      position: "fixed",
      width: "100%", background: '#000', top: 0, justifyContent: "space-between",
      paddingRight: "10px", paddingLeft: "10pxa"
    }}>
      
      <Stack direction="row" spacing={2} sx={{ marginRight: "20px" }}>
        <button onClick={clickedBurgerMenu} style={{ backgroundColor: "black", border: "none" }}>
          <BurgerMenuIcon />
        </button>

        <Stack className="youtube-icon" sx={{ paddingTop: "6px", 
        display: { xs: "none", xs400:"inline" }
      }}>
          <Link to="/" >
            <YoutubeIcon />
          </Link>
        </Stack>

      </Stack>

      <SearchBar display={{ xs: "none", sm: "inline" }} />
      <SmSearchBar changeSmallSearchBarDisplay={changeSmSearchBarDisplay}
        display={{ xs: smSearchBarDisplay ? "inline" : "none", sm: "none" }}
        width="250px" />

    
      <Stack direction="row" spacing={{ xs: 0, sm: 1 }} sx={{ marginRight: "20px" }}>
      

        <Box sx={{ display:{ xs: smSearchBarDisplay ? "none" : "inline", sm: "none" } }}>
          <button onClick={changeSmSearchBarDisplay} style={{
            backgroundColor: "black", border: "none",
            marginRight: "-5px"
          }}>
            <SearchIcon />
          </button>
        </Box>


        <button onClick={clickedLiveIcon} style={{
          backgroundColor: "black", border: "none",
          marginRight: "-5px"
        }}>
          <LiveIcon />
        </button>
        <button onClick={clickedNotiIcon} style={{ backgroundColor: "black", border: "none" }}>
          <NotiIcon />
        </button>
        <div style={{ backgroundColor: "rgba(0,0,0,0)", color: "white" }}>
          <LoginDropdown accountIcon={<AccountIcon />} />
        </div>


      </Stack>

    </Stack>
  );
}

export default Navbar;
