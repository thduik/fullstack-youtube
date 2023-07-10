// import React from "react";

function ShareIcon(
    { width = "30px", height = "30px", fillColor = "white", viewBox = "0 0 30 30" }
) {
    return (
        <svg
            viewBox={viewBox}
            style={{ width: width, height: height, borderRadius: "0px" }}
            display="block"
            pointerEvents="none"
        >
            <path
                style={{ fill: fillColor }}
                fillRule="evenodd"
                d="M17.738 5.266l10.936 9.996a1 1 0 010 1.477l-10.936 9.997c-.642.586-1.675.13-1.675-.739v-4.375c-6.137 0-9.372 2.316-10.901 3.975-.355.384-1.189.137-1.162-.385.226-4.38 1.86-14.323 12.063-14.323V6.004c0-.87 1.033-1.325 1.675-.738z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default ShareIcon;
