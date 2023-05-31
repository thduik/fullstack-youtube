import React from "react";

function DropdownArrowDownIcon(
  {width="18px", height="18px", fillColor="white", viewBox="0 0 18 18"}
) {
  return (
    <svg
      className="style-scope tp-yt-iron-icon"
      display="block"
      pointerEvents="none"
      viewBox={viewBox}
      style={{ width: width, height: height, borderRadius: "0px" }}
        >
      <g className="style-scope tp-yt-iron-icon">
        <path fill={fillColor}
          d="M12 15.7L5.6 9.4l.7-.7 5.6 5.6 5.6-5.6.7.7-6.2 6.3z"
          className="style-scope tp-yt-iron-icon"
        ></path>
      </g>
    </svg>
  );
}

export default DropdownArrowDownIcon;
