import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './index.css'
import MySearchButton from './MySearchButton';
import useSearchField from '../../hooks/useSearchField';
import useAutoSuggest from '../../hooks/useAutoSuggest';
import SearchSuggestions from './SearchSuggestions';

const maginifierIconColor = 'white'
const iconBackgroundColor = '#707070'
const searchfieldBackgroundColor = 'black'
const placeholderColor = 'yellow'
const iconLeftBorderColor = 'gray'
const searchFieldBorderColor = 'gray'

const SearchBar = ({display,position="default", 
  width={ xs: '0px', sm:'200px', md: '300px', lg: '450px' }}) => {
  const {searchTerm, handleOnChange, onhandleSubmit} = useSearchField()
  const {suggestArr} = useAutoSuggest({searchTerm:searchTerm})
  const inputFocus = () => {
    console.log('input focus')
  }
  return (
    <Paper

      component='form'
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: '20px',
        border: '1px solid #e3e3e3',
        borderColor: searchFieldBorderColor,
        pl: 3,
        boxShadow: 'none',
        // mr: { sm: 5 },
        backgroundColor: searchfieldBackgroundColor //without this there will be leftover white in searchbar
        , width: width,
        display:display,
        position:position
      }}
    > 
      {/* <div style={{position:'fixed', width:'100%', flexDirection:'column', marginTop:'40px'
      ,display:suggestArr.length ? 'flex' : 'none'}}> */}
        <SearchSuggestions suggestArr={suggestArr} inputFocus = {inputFocus}/>
      {/* </div> */}
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
        
        <MySearchButton iconBackgroundColor={iconBackgroundColor} marginLeft={ {xs: '-30px', md: '0', lg:'150px'} } />
      </Stack>

      
    </Paper>
  );
};

export default SearchBar;
