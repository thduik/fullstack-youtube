// import React from "react";

function CheckmarkIcon(
    {width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 24 24"
      style={{ width: width, height: height, borderRadius: "0px" }}
    >
      <path
        style={{fill:fillColor}}
        fillRule="nonzero"
        d="M21 4.009c0-.478-.379-1-1-1H4c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm2.449 7.882l3.851 3.43c.142.128.321.19.499.19a.746.746 0 00.552-.242l5.953-6.509a.747.747 0 00-.552-1.249.751.751 0 00-.554.243l-5.453 5.962-3.298-2.938a.746.746 0 10-.998 1.113z"
      ></path>
    </svg>
  );
}

export default CheckmarkIcon;