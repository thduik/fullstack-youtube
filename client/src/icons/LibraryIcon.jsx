import React from "react";
import './icons.css'

function LibraryIcon({width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}) {
    return (
        <svg
            className="style-scope yt-icon"
            display="block"
            viewBox={viewBox}
            style={{ width: width, height: height, borderRadius: "15px" }}
        >
            <g className="style-scope yt-icon">
                <path
                    d="M11 7l6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"
                    className="style-scope yt-icon"
                    style={{ fill: fillColor }}
                ></path>
            </g>
        </svg>
    );
}

export default LibraryIcon;