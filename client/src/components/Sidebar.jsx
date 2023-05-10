import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";

import { useSelector, useDispatch } from 'react-redux'
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useEffect, useState } from "react";
import {changeShowSidebar} from '../features/uiState/uiStateSlice.js'
import YoutubeIcon from '../icons/YoutubeIcon'



const Categories = (props) => {
  const dispatch = useDispatch()
  const selectedCategory = useSelector((state) => state.appData.selectedCategory)
  const showSidebar = useSelector((state) => state.uiState.showSidebar)
  // const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  // const setSelectedCategory = dispatch(changeSelectedCategory())
  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  const categoryClicked = (catName) => {
    console.log("categoryClicked")
    if (catName == selectedCategory) {
      console.log("selected same cat as current one")
      return
    }
    dispatch(changeSelectedCategory(catName))
  }

  const youtubeIconClicked = () => {
    const newState = !showSidebar

    console.log("youtubeIconClicked newState is", newState)
    
    dispatch(changeShowSidebar(newState))
  }

  return (
    <div style={{float:"left", position:"fixed", zIndex:3}}>
    <Stack
      // direction="column"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        // flexDirection: { xs:"column", md: "column" },
        width: "180px",
        backgroundColor:"brown"
      }}

    >
      <button
          className="category-btn"
          onClick={ () => {youtubeIconClicked()}}
          >
            <YoutubeIcon/>
          </button>
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => categoryClicked(category.name)}
          style={{
            background: category.name === selectedCategory && "#FC1503",
            color: "white",
          }}
          key={category.name}
        >
          <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}>
            {category.icon}
          </span>
          <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
    </div>
  );
}

export default Categories;
