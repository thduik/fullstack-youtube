import React from "react";

function GlobeIcon(
    {width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}
) {
  return (
    <svg
      width="24"
      height="24"
      display="block"
      pointerEvents="none"
      viewBox="0 0 24 24"
      style={{ width: width, height: height }}
    >
      <path fill={fillColor}
       d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM3 12c0-.7.09-1.37.24-2.02L8 14.71v.79c0 1.76 1.31 3.22 3 3.46v1.98c-4.49-.5-8-4.32-8-8.94zm8.5 6A2.5 2.5 0 019 15.5v-1.21l-5.43-5.4C4.84 5.46 8.13 3 12 3c1.05 0 2.06.19 3 .53V5c0 .55-.45 1-1 1h-3v2c0 .55-.45 1-1 1H8v3h6c.55 0 1 .45 1 1v4h2c.55 0 1 .45 1 1v.69A8.944 8.944 0 0112 21v-3h-.5zm7.47-.31C18.82 16.73 18 16 17 16h-1v-3c0-1.1-.9-2-2-2H9v-1h1c1.1 0 2-.9 2-2V7h2c1.1 0 2-.9 2-2V3.95c2.96 1.48 5 4.53 5 8.05 0 2.16-.76 4.14-2.03 5.69z"></path>
    </svg>
  );
}

export default GlobeIcon;