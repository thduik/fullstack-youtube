// import React from "react";

function LikeIconB(
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
                d="M25.841 11.998c.837 0 1.619.416 2.086 1.11a3.352 3.352 0 01-.019 3.77l-.728 1.06.675 1.566a3 3 0 01-.259 2.852L26.5 24v1.998a2 2 0 01-2 2H12a2 2 0 01-2-2V12.826a4 4 0 01.745-2.325l5.118-7.165c.215-.3.61-.41.948-.265a3.925 3.925 0 012.266 4.543L18 11.998h7.841zM5 13.5a2 2 0 00-2 2V26a2 2 0 002 2h3V13.5H5z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}

export default LikeIconB;