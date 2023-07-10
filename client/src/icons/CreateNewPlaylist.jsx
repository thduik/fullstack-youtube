// import React from "react";

function CreateNewPlaylistIcon(
    {width="30px", height="30px", fillColor="white", viewBox="-3 -3 30 30"}
) {
  return (
    <svg
      width="24"
      height="24"
      display="block"
      pointerEvents="none"
      viewBox="0 0 24 24"
      style={{ width: width, height: height, borderRadius: "0px" }}
    >
      <path fill={fillColor}
       d="M4 20h14v1H3V6h1v14zm14-10h-4V6h-1v4H9v1h4v4h1v-4h4v-1zm3-7v15H6V3h15zm-1 1H7v13h13V4z"></path>
    </svg>
  );
}

export default CreateNewPlaylistIcon;