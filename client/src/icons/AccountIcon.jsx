import React from "react";
import './icons.css'
function AccountIcon({width="30px", height="30px", fillColor="white", viewBox="0 0 24 24"}) {
    return (
        <svg
            
            // className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
            className="nav-icon"
            data-testid="AccountCircleIcon"
            // viewBox="0 0 24 24"
            viewBox={viewBox}
            style={{ marginRight:marginRight,width: width, height: height, borderRadius:borderRadius}}
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0112.28 0C16.43 19.18 14.03 20 12 20z"
            style={{fill:fillColor}}>
            </path>
        </svg>
    );
}

export default AccountIcon;