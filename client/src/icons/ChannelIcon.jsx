import React from "react";

function ChannelIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24"}
) {
  return (
    <svg
      viewBox={viewBox}
      style={{ width: width, height: height }}
      display="block"
      pointerEvents="none"
    >
      <path fill={fillColor}
       d="M3 3v18h18V3H3zm1.99 17c.39-2.62 2.38-5.1 7.01-5.1s6.62 2.48 7.01 5.1H4.99zM9 10c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3.72 3.93A4.004 4.004 0 0016 10c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.96 1.42 3.59 3.28 3.93-4.42.25-6.84 2.8-7.28 6V4h16v15.93c-.44-3.2-2.86-5.75-7.28-6z"></path>
    </svg>
  );
}

export default ChannelIcon;
