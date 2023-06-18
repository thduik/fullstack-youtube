

import React from "react";

function LoopPlaylistIcon(
  {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24"}
) {
  return (
    <svg
      width="24"
      height="24" 
      display="block"
      pointerEvents="none"
      viewBox={viewBox}
      style={{ width: width, height: height }}
    >
      <path fill={fillColor}
      d="M21 13h1v5l-18.07.03 2.62 2.62-.71.71-3.85-3.86 3.85-3.85.71.71-2.67 2.67L21 17v-4zM3 7l17.12-.03-2.67 2.67.71.71 3.85-3.85-3.85-3.85-.71.71 2.62 2.62L2 6v5h1V7z"></path>
    </svg>
  );
} 

export default LoopPlaylistIcon;