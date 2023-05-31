import React from "react";

function UnlistedIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24", borderRadius="15px"}
) {
  return (
    <svg
      width="24"
      height="24"
      display="block"
      pointerEvents="none"
      viewBox={viewBox}
      style={{ width: width, height: height}}
    >
      <path fill={fillColor}
       d="M17.78 16H13v-1h4.78c1.8 0 3.26-1.57 3.26-3.5S19.58 8 17.78 8H13V7h4.78c2.35 0 4.26 2.02 4.26 4.5S20.13 16 17.78 16zM11 15H6.19c-1.8 0-3.26-1.57-3.26-3.5S4.39 8 6.19 8H11V7H6.19c-2.35 0-4.26 2.02-4.26 4.5S3.84 16 6.19 16H11v-1zm5-4H8v1h8v-1z"></path>
    </svg>
  );
}

export default UnlistedIcon;