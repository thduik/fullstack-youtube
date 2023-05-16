
import { useState } from 'react';
import { googleIconUrl } from '../../utils/constants';
import './index.css'

//for now button and div takes exact same space

const backgroundColor = "rgba(0,0,0,0)"
const buttonHeight = "36px"
const textPaddingTop = "4px"

const GoogleSignInButton = ({dropdownMenuWidth, loginWithGoogle}) => {

    return (
        <div className="button-wrapper"
         style={{ width: dropdownMenuWidth, height:buttonHeight,border: "1px solid gray",
         borderRadius:"18px" }}>
            <button style={{backgroundColor:backgroundColor,
                width: "100%", height:buttonHeight,
                border:"none", padding: "5px 5px 5px 15px"
            }} onClick={() => loginWithGoogle()}>
                <div style={{
                    backgroundColor: backgroundColor, display: "flex",
                    flexDirection: "row"
                }}>
                    <img src={googleIconUrl} height="24px" />
                    <p style={{ color: "white", paddingTop: textPaddingTop, paddingLeft: "10px" }}>Login with Googlez</p>
                </div>
            </button>
        </div>
    )
}

export default GoogleSignInButton;