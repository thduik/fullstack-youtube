
import IconButton  from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const MySearchButton = ({
    searchButtonClicked, iconBackgroundColor="red",
    maginifierIconColor = 'white', iconLeftBorderColor="gray",
    marginLeft = { xs: '-30px', md: '0px' }
}) => {
    return (
    <IconButton 
          type='submit' sx={{
            backgroundColor: iconBackgroundColor,
            p: '10px', color: maginifierIconColor,
            borderRadius: '0 20px 20px 0px', padding: ' 5px 10px 5px 12px'
            , borderLeft: '1px solid white'
            , marginLeft: marginLeft
            ,borderColor: iconLeftBorderColor,
            borderRight: '1px solid gray'
          }}
          aria-label='search'>
          <SearchIcon/>
        </IconButton>
    )
}


export default MySearchButton;