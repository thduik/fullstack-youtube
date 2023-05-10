import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";
import LiveIcon from "../icons/LiveIcon";
import NotiIcon from "../icons/NotiIcon";
import AccountIcon from "../icons/AccountIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import BurgerMenuIcon from "../icons/BurgerMenuIcon";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { changeShowSidebar } from "../features/uiState/uiStateSlice";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = (props) => {
  const dispatch = useDispatch()
  const showSidebar = useSelector((state)=>state.uiState.showSidebar)
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
    <Stack direction="row" alignItems="center" p={2} sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between" }}>
      {/* <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link> */}
      <Stack direction="row" spacing={2} sx={{ marginRight: "20px" }}>
        <button onClick={clickedBurgerMenu} style={{ backgroundColor: "black", border: "none" }}>
          <BurgerMenuIcon />
        </button>
        <Link to="/">
          <YoutubeIcon />
        </Link>
      </Stack>

      <SearchBar />
      <Stack direction="row" spacing={2} sx={{ marginRight: "20px" }}>

        <button onClick={clickedLiveIcon} style={{ backgroundColor: "black", border: "none" }}>
          <LiveIcon />
        </button>
        <button onClick={clickedNotiIcon} style={{ backgroundColor: "black", border: "none" }}>
          <NotiIcon />
        </button>
        <button onClick={clickedAccountIcon} style={{ backgroundColor: "black", border: "none" }}>
          <AccountIcon />
        </button>
      </Stack>

    </Stack>
  );
}

export default Navbar;
