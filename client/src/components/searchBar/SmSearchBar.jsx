import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './index.css'
import MySearchButton from './MySearchButton';
import { Box } from '@mui/system';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import useSearchField from '../../hooks/useSearchField';
import useAutoSuggest from '../../hooks/useAutoSuggest';
import SearchSuggestions from './SearchSuggestions';
import useSuggestMargin from '../../hooks/useSuggestMargin';

const maginifierIconColor = 'white'
const iconBackgroundColor = '#707070'
const searchfieldBackgroundColor = 'black'
const placeholderColor = 'yellow'
const iconLeftBorderColor = 'gray'
const searchFieldBorderColor = 'gray'

const paperMarginLeft = { xs: "12%", xs580: "13.5%" }
const paperWidth = { xs: "65%", xs580: "60%" }

const arrowButtonMarginLeft = { xs: "0px", xs580: "9px" }

const SmSearchBar = ({ changeSmallSearchBarDisplay,
  display, position = "absolute",
  width = {
    xs: '0px', sm: '200px', md: '300px', lg: '450px',
  } }) => {
  const {searchTerm, handleOnChange, onhandleSubmit} = useSearchField()
  const {suggestArr} = useAutoSuggest({searchTerm:searchTerm})
  const {suggMarginLeft} = useSuggestMargin()
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate();
  const inputFocus = () => {
    console.log('input focus'); setIsFocused(true)
  }

  return (
    <Stack direction="row"
      sx={{
        display: display, position: position, width: "100%", backgroundColor: "black"
        , flexDirection: "row", paddingBottom:"4px"
      }}>
      
      <IconButton onClick={changeSmallSearchBarDisplay}
        sx={{
           marginTop: "7px", backgroundColor: "none"
          , marginLeft: arrowButtonMarginLeft
        }}>
        <ArrowLeftIcon height="34px" width="34px" viewBox="-4.5 -4.5 34 34" />
      </IconButton>

      <Paper

        component='form'
        onSubmit={onhandleSubmit}
        sx={{

          marginTop: "-44px",
          marginLeft: paperMarginLeft,
          borderRadius: '20px',
          border: '1px solid #e3e3e3',
          borderColor: searchFieldBorderColor,
          pl: 3,
          boxShadow: 'none',
          // mr: { sm: 5 },
          backgroundColor: searchfieldBackgroundColor //without this there will be leftover white in searchbar
          , width: paperWidth,
        }}
      >
        <SearchSuggestions suggestArr={suggestArr} marginLeft={suggMarginLeft} isFocused = {isFocused}/>
        <Stack direction="row" sx={{

        }}>
          <input
            className='search-bar'
            placeholder='Search...'
            style={{ color: "white", backgroundColor: searchfieldBackgroundColor }}
            value={searchTerm}
            onChange={handleOnChange}
            onFocus={inputFocus}
          />

          <MySearchButton iconBackgroundColor={iconBackgroundColor} marginLeft={{ xs: '0px', md: '0', lg: '0px' }} />
        </Stack>
      </Paper>

    </Stack>
  );
};

export default SmSearchBar;