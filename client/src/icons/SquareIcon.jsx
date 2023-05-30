import React from "react";

function SquareIcon(
    {width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fillRule="evenodd"
      clipRule="evenodd"
      style={{ width: width, height: height, borderRadius: "0px" }}
    >
      <path d="M21 0H3a3 3 0 00-3 3v18a3 3 0 003 3h18a3 3 0 003-3V3a3 3 0 00-3-3m0 2c.552 0 1 .449 1 1v18a1 1 0 01-1 1H3c-.551 0-1-.448-1-1V3c0-.551.449-1 1-1h18z"></path>
    </svg>
  );
}

export default SquareIcon;