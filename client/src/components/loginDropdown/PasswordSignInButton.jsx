import { useState } from 'react';
// import { googleIconUrl } from '../../utils/constants';
import './index.css'

//for now button and div takes exact same space

const backgroundColor = "rgba(0,0,0,0)"
const buttonHeight = "36px"
const textPaddingTop = "4px"
const buttonText = "Login With Password"

const PasswordSignInButton = ({dropdownMenuWidth, loginWithPassword, marginTopBottom}) => {

    return (
        <div className="button-wrapper"
         style={{ marginTop:marginTopBottom, marginBottom:marginTopBottom,
            width: dropdownMenuWidth, height:buttonHeight,border: "1px solid gray",
         borderRadius:"18px" }}>
            <button style={{backgroundColor:backgroundColor,
                width: "100%", height:buttonHeight,
                border:"none", padding: "5px 5px 5px 5px"
            }} onClick={loginWithPassword}>
                    <p style={{ fontSize:"13px",color: "white", paddingTop: textPaddingTop, paddingLeft: "0px" }}>{buttonText}</p>
            </button>
        </div>
    )
}

export default PasswordSignInButton;