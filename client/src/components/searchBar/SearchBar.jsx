import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './index.css'

const maginifierIconColor = 'white'
const iconBackgroundColor = '#707070'
const searchfieldBackgroundColor = 'black'
const placeholderColor = 'yellow'
const iconLeftBorderColor = 'gray'
const searchFieldBorderColor = 'gray'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);

      setSearchTerm('');
    }
  };

  return (
    <Paper
      backgroundColor="blue"
      component='form'
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: '20px',
        border: '1px solid #e3e3e3',
        borderColor:searchFieldBorderColor,
        pl: 3,
        boxShadow: 'none',
        // mr: { sm: 5 },
        backgroundColor:searchfieldBackgroundColor //without this there will be leftover white in searchbar
      }}
    >
      <Stack direction="row">
      <input
        // styles={{width:'100%'}}
        className='search-bar'
        placeholder='Search...'
        placeholderColor={placeholderColor}
        style={{color:"red", backgroundColor:searchfieldBackgroundColor, placeholderColor:"red"}}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type='submit' sx={{ p: '10px', color: maginifierIconColor, backgroundColor: iconBackgroundColor, 
        borderRadius:'0 20px 20px 0px', padding:' 5px 10px 5px 12px'
        , borderLeft:'1px solid white', borderColor:iconLeftBorderColor
      }} 
        aria-label='search'>
        <SearchIcon />
      </IconButton>
      </Stack>
    </Paper>
  );
};

export default SearchBar;
