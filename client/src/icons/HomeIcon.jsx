import React from "react";
import './icons.css'

function HomeIcon({width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}) {
    return (
        <svg
            className="style-scope yt-icon"
            display="block"
            viewBox={viewBox}
            style={{ width: width, height: height, borderRadius: "15px" }}
        >
            <g className="style-scope yt-icon">
                <path
                    style={{ fill: fillColor }}
                    d="M4 10v11h6v-6h4v6h6V10l-8-7z"
                    className="style-scope yt-icon"
                ></path>
            </g>
        </svg>
    );
}

export default HomeIcon;