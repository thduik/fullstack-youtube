import React from "react";

function LockIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24"}
) {
  return (
    <svg
    //   width="24"
    //   height="24"
      display="block"
      pointerEvents="none"
      viewBox="0 0 24 24"
      style={{ width: width, height: height }}
    >
      <path fill={fillColor}
       d="M17 8V6.63C17 4.08 14.76 2 12 2S7 4.08 7 6.63V8H4v14h16V8h-3zM8 6.63c0-2.02 1.79-3.66 4-3.66s4 1.64 4 3.66V8H8V6.63zM19 21H5V9h14v12zm-7-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
    </svg>
  );
}

export default LockIcon;