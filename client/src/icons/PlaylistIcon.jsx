import React from "react";

function PlaylistIcon(
    { width = "30px", height = "30px", fillColor = "white", viewBox = "-3 -3 30 30", borderRadius = "15px" }
) {
  return (
    <svg
      display="block"
      pointerEvents="none"
      viewBox="0 0 24 24"
      style={{ width: width, height: height, borderRadius: borderRadius }}
    >
      <path fill={fillColor}
       d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"></path>
    </svg>
  );
}

export default PlaylistIcon;