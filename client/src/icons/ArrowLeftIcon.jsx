// import React from "react";

function ArrowLeftIcon({ marginRight = "0px",
    width = "24px", height = "24px", fillColor = "white", viewBox = "0 0 24 24", borderRadius = "15px" }) {
    return (
        <svg
            className="nav-icon"
            style={{ width: height, height: width, 
            borderRadius:"20px 20px 20px 20px"}}
            viewBox={viewBox}

        >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
             style={{ fill: fillColor }}></path>
        </svg>
    );
}

export default ArrowLeftIcon;
