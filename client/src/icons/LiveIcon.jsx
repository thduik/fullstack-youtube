import React from "react";
import './icons.css'


function LiveIcon() {
    return (
        <svg
            // className="style-scope yt-icon"
            className="nav-icon"
            // display="block"
            // pointerEvents="none"
            viewBox="-5 -4 32 32"
            style={{ width: "30px", height: "30px", borderRadius:"15px" }}
        >
            <g className="style-scope yt-icon">
                <path
                    d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"
                    className="style-scope yt-icon"
                    //fill = path color
                    style={{ fill: "white" }}
                ></path>
            </g>
        </svg>
    );
}

export default LiveIcon;
