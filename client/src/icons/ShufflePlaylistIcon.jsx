import React from "react";

function ShufflePlaylistIcon(
    {width="24px", height="24px", fillColor="white", viewBox="0 0 24 24", borderRadius="15px"}
) {
  return (
    <svg
      display="block"
      pointerEvents="none"
      viewBox={viewBox}
      style={{ width: width, height: height }}
    >
      <path fill={fillColor}
      d="M18.15 13.65L22 17.5l-3.85 3.85-.71-.71L20.09 18H19a9.76 9.76 0 01-7.39-3.38l.76-.65A8.767 8.767 0 0019 17h1.09l-2.65-2.65.71-.7zM19 7h1.09l-2.65 2.65.71.71L22 6.51l-3.85-3.85-.71.71L20.09 6H19c-3.58 0-6.86 1.95-8.57 5.09l-.73 1.34A8.769 8.769 0 012 17v1c3.58 0 6.86-1.95 8.57-5.09l.73-1.34A8.769 8.769 0 0119 7zM8.59 9.98l.75-.66A9.767 9.767 0 002 6v1c2.52 0 4.92 1.09 6.59 2.98z"></path>
    </svg>
  );
}

export default ShufflePlaylistIcon;