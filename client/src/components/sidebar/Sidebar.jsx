import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../../utils/constants";

import { useSelector, useDispatch } from 'react-redux'
import { fetchFromAPI } from "../../apiFetch/fetchFromAPI";
import { useEffect, useState } from "react";
import { changeShowSidebar } from '../../features/uiState/uiStateSlice.js'
import { changeSelectedCategory } from "../../features/appData/appDataSlice";
import YoutubeIcon from '../../icons/YoutubeIcon'
import BurgerMenuIcon from "../../icons/BurgerMenuIcon";
import './index.css'
import { Link } from "react-router-dom";


const allBackgroundColor = "#202020"   //div and stacks
const youtubeButtonBackgroundColor = "#202020"   //youtube icon button
const youtubeButtonDivBackgroundColor = "#202020"   //div containing youtube icon button

const Sidebar = (props) => {
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state) => state.appData.selectedCategory)
  const showSidebar = useSelector((state) => state.uiState.showSidebar)
  const [videos, setVideos] = useState(null);

  // useEffect(() => {
  //   setVideos(null);
  //   fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
  //     .then((data) => setVideos(data.items))
  // }, [selectedCategory]);

  const categoryClicked = (catName) => {
    console.log("categoryClicked catName is", catName)
    if (catName == selectedCategory) {
      console.log("selected same cat as current one")
      return
    }
    dispatch(changeSelectedCategory(catName))
  }

  const youtubeIconClicked = () => {
    const newState = !showSidebar
    dispatch(changeShowSidebar(newState))
  }

  return (
    <div style={{ float: "left", position: "fixed", zIndex: 3, background: allBackgroundColor }}>
      <Stack
        // direction="column"
        sx={{
          overflowY: "auto",
          height: { sx: "auto", md: "95%" },
          width: "180px",
          backgroundColor: "rgba(0,0,0,0)"
        }}

      >
        <div style={{ display: "flex", height: "60px", backgroundColor: youtubeButtonDivBackgroundColor }}>
          <div style={{
            paddingLeft: "16px", paddingTop: "18px", backgroundColor: youtubeButtonDivBackgroundColor
          }}>

            <button
              style={{ backgroundColor: youtubeButtonBackgroundColor, border: "none" }}
              onClick={() => { youtubeIconClicked() }}
            >
              <BurgerMenuIcon />
            </button>
          </div>

          <div style={{ paddingTop: "24px", paddingLeft:"13px" }}>
            
            <Link to="/">
              <YoutubeIcon />
            </Link>
          </div>

        </div>
        <div style={{ backgroundColor: allBackgroundColor }}>


          {categories.map((category) => (
            <button
              className="category-btn"
              onClick={() => categoryClicked(category.name)}
              style={{
                // background: category.name === selectedCategory && "green",
                color: "white",
                width: "150px",
                marginLeft: "4px"
              }}
              key={category.name}
            >
              <span style={{ color: category.name === selectedCategory ? "white" : "white", marginRight: "12px" }}>
                {category.icon}
              </span>
              <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </Stack>
    </div>
  );
}

export default Sidebar;
