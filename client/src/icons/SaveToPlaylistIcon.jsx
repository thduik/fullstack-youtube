// import React from "react";

function SaveToPlaylistIcon(
    { width = "30px", height = "30px", fillColor = "white", viewBox = "-3 -3 30 30", borderRadius = "15px" }
) {
  return (
    <svg
    className="nav-icon"
    viewBox={viewBox}
    style={{ width: width, height: height, borderRadius: borderRadius }}
    >
      <path fill={fillColor}
      d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z"></path>
    </svg>
  );
}

export default SaveToPlaylistIcon;