import React from "react";

function DislikeIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24"}
) {
  return (
    <svg
      
      display="block"
      pointerEvents="none"
      viewBox={viewBox}
      style={{ width: width, height: width }}
    >
      <path fill={fillColor}
      d="M17 4H6.57c-1.07 0-1.98.67-2.19 1.61l-1.34 6C2.77 12.85 3.82 14 5.23 14h4.23l-1.52 4.94C7.62 19.97 8.46 21 9.62 21c.58 0 1.14-.24 1.52-.65L17 14h4V4h-4zm-6.6 15.67c-.19.21-.48.33-.78.33-.26 0-.5-.11-.63-.3a.534.534 0 01-.09-.47l1.52-4.94.4-1.29H5.23c-.41 0-.8-.17-1.03-.46a.846.846 0 01-.18-.72l1.34-6c.1-.47.61-.82 1.21-.82H16v8.61l-5.6 6.06zM20 13h-3V5h3v8z"></path>
    </svg>
  );
}

export default DislikeIcon;
