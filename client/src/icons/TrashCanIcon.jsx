import React from "react";

function TrashCanIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24", borderRadius="15px"}
) {
  return (
    <svg
      width="24"
      height="24"
      display="block"
      pointerEvents="none"
      viewBox="0 0 24 24"
      style={{ width: width, height: height}}
    >
      <path fill={fillColor}
       d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path>
    </svg>
  );
}

export default TrashCanIcon;