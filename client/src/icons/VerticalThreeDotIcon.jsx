import React from "react";

function VerticalThreeDotIcon({width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30", borderRadius="15px"}) {
  return (
    <svg
    className="nav-icon"
    //   width={width}
    //   height={height}
      viewBox={viewBox}
      style={{ width: width, height: height, borderRadius:"15px" }}
    >
      <path fill={fillColor} style={{fill:fillColor}}
      d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
    </svg>
  );
}

export default VerticalThreeDotIcon;