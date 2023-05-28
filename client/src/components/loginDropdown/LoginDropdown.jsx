// import Dropdown from 'react-bootstrap/Dropdown';



import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Stack } from "@mui/material";
import './index.css'
import BlueAccountIcon from '../../icons/BlueAccountIcon';
import GoogleSignInButton from './GoogleSignInButton';
import PasswordSignInButton from './PasswordSignInButton';
import { handleGoogleToken } from '../../utils/handleGoogleToken';
import TestDropdown from '../testComponent/TestDropdown';
import { login, logout } from "../../features/user/userSlice"
import { useDispatch } from 'react-redux';


const backgroundColor = "rgba(0,0,0,0)" //important because all elements being transparent allow effects to work
const totalWidth = "87px"
const buttonFontColor = "#3ea6ff"


const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-110px"
const dropdownBackgroundColor = "#171717"

function LoginDropdown({ accountIcon }) {
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)
  const logOutGoogleClicked = () => {
    console.log("logOutGoogleClicked")
    googleLogout()
  }
  const handleGoogleTokenSuccess = (tokenResponse) => {
    handleGoogleToken(tokenResponse, (res)=>{
      dispatch(login(res.data))
    })
  }
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleTokenSuccess(tokenResponse),
    scope: "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
  });

  const toggleMenuDisplay = () => {
    const newState = !showDropdown
    setShowDropdown(newState)
  }
  return (
    <div className="comp-wrapper" style={{
      width: totalWidth, paddingTop: "3px",
      paddingLeft: "3px", borderRadius: "26px", border: "1px solid gray"
      ,marginRight:"10px"
    }}>
      <button className="sign-in" style={{  border: "none" 
      }}
        onClick={toggleMenuDisplay}>
        <div style={{
          backgroundColor: "rgba(0,0,0,0)", width: totalWidth, display: "flex",
          flexDirection: "row"
        }}>
          <BlueAccountIcon fillColor={buttonFontColor} />
          <p style={{
            color: buttonFontColor, paddingTop: "4px", paddingLeft: "3px",
            fontWeight: "bold"
            
          }}>Sign In</p>
        </div>

      </button>

      <div style={{
        position: "fixed", justifyContent: "end", backgroundColor:dropdownBackgroundColor,
        width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft, marginTop: "10px",
        border: "1px solid gray",  
        display: showDropdown ? "flex" : "none", flexDirection:"column",
        padding: "5px 6px 2px 6px", borderRadius:"22px"
      }} >
        <GoogleSignInButton loginWithGoogle={loginWithGoogle} marginTopBottom="3px" />
        <PasswordSignInButton marginTopBottom="6px" />


        <TestDropdown/>
       
      </div>
    </div>

  );
}

export default LoginDropdown;