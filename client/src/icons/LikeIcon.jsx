import React from "react";

function LikeIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24"}

) {
  return (
    <svg
      display="block"
      pointerEvents="none"
      viewBox={viewBox} 
      style={{ width: width, height: width }}
    >
      <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h14.43c1.06 0 1.98-.67 2.19-1.61l1.34-6c.27-1.24-.78-2.39-2.19-2.39zM7 20H4v-8h3v8zm12.98-6.83l-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.19-.21.48-.33.78-.33.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94-.4 1.29h5.58c.41 0 .8.17 1.03.46.13.15.26.4.19.71z"></path>
    </svg>
  );
}

export default LikeIcon;
