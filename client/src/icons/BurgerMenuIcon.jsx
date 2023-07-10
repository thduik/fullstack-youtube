// import React from "react";

function BurgerMenuIcon({width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}) {
    return (
        <svg
            // className="style-scope yt-icon"
            className="nav-icon"
            display="block"
            //   pointerEvents="none"
            viewBox={viewBox}
            style={{ width: width, height: height, borderRadius: "15px" }}
        >
            <g className="style-scope yt-icon">
                <path
                    style={{ fill: fillColor }}
                    d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"
                    className="style-scope yt-icon"
                ></path>
            </g>
        </svg>
    );
}

export default BurgerMenuIcon;