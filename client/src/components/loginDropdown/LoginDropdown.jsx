// import Dropdown from 'react-bootstrap/Dropdown';



import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Stack } from "@mui/material";
import './index.css'
import BlueAccountIcon from '../../icons/BlueAccountIcon';
import GoogleSignInButton from './GoogleSignInButton';
import PasswordSignInButton from './PasswordSignInButton';


const backgroundColor = "rgba(0,0,0,0)" //important because all elements being transparent allow effects to work
const totalWidth = "87px"
const buttonFontColor = "#3ea6ff"


const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-120px"
const dropdownBackgroundColor = "rgba(0,0,0,0)"

function LoginDropdown({ accountIcon }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const logOutGoogleClicked = () => {
    console.log("logOutGoogleClicked")
    googleLogout()
  }
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const toggleMenuDisplay = () => {
    const newState = !showDropdown
    setShowDropdown(newState)
  }
  return (
    <div className="comp-wrapper" style={{
      width: totalWidth, paddingTop: "3px",
      paddingLeft: "3px", borderRadius: "20px", border: "1px solid gray"
    }}>
      <button className="sign-in" style={{ backgroundColor: backgroundColor, border: "none" }}
        onClick={toggleMenuDisplay}>
        <div style={{
          backgroundColor: backgroundColor, width: totalWidth, display: "flex",
          flexDirection: "row"
        }}>
          {/* {accountIcon}  */}
          <BlueAccountIcon fillColor={buttonFontColor} />
          <p style={{
            color: buttonFontColor, paddingTop: "4px", paddingLeft: "3px",
            fontWeight: "bold"
          }}>Sign In</p>
        </div>

      </button>

      <div style={{
        position: "fixed", justifyContent: "end", backgroundColor: dropdownBackgroundColor,
        width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft, marginTop: "10px",
        border: "1px solid gray",  
        //testing css
        display: showDropdown ? "flex" : "none", flexDirection:"column"
      }} >
        <GoogleSignInButton loginWithGoogle={loginWithGoogle} />
          <PasswordSignInButton />
        {/* <Stack direction="column"
          style={{
            display: showDropdown ? "block" : "none", flexDirection: "column",
            backgroundColor: "black", width: "100%"
          }}
        >
          <GoogleSignInButton loginWithGoogle={loginWithGoogle} />
          <PasswordSignInButton />

        </Stack> */}
      </div>
    </div>

  );
}

export default LoginDropdown;