// import React from "react";

function CommentIcon(
    {width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}
) {
  return (
    <svg
      viewBox={viewBox}
      display="block"
      pointerEvents="none"
      style={{ width: width, height: height, borderRadius: "0px" }}

    >
      <path
        style={{fill:fillColor}}
        fillRule="evenodd"
        d="M5.5 3A2.5 2.5 0 003 5.5v16A2.5 2.5 0 005.5 24h17l4.247 4.574c.804.866 2.253.297 2.253-.885V5.5A2.5 2.5 0 0026.5 3h-21zM8 10.5A1.5 1.5 0 019.5 9h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 018 10.5zm0 6A1.5 1.5 0 019.5 15h9a1.5 1.5 0 010 3h-9A1.5 1.5 0 018 16.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CommentIcon;