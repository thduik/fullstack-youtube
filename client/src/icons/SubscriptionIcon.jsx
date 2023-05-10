import React from "react";
import './icons.css'

function SubscriptionIcon({width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30", borderRadius="15px"}) {
    return (
        <svg
            className="style-scope yt-icon"
            display="block"
            viewBox={viewBox}
            style={{ width: "30px", height: "30px", borderRadius:borderRadius }}
        >
            <g className="style-scope yt-icon">
                <path
                    d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"
                    className="style-scope yt-icon"
                    style={{ fill: fillColor }}
                ></path>
            </g>
        </svg>
    );
}

export default SubscriptionIcon;