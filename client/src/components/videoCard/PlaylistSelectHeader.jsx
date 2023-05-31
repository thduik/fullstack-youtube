
import React from "react";
import "./index.css"

const PlaylistSelectHeader = ({onClickClose}) => {
    const clickedLol = () => {onClickClose()}
    return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"
        ,margin:"10px 15px 15px 15px"}}>
            <h5 style={{color:"white",fontSize:"17px"}}>Save to ...</h5>
            <div className="hover-pointer"
            style={{width:"30px", marginTop:"-2px", marginRight:"-10px"}} onClick={clickedLol}>
                <XIcon/>
            </div>
        </div>
    )
}

export default PlaylistSelectHeader;







function XIcon() {
  return (
    <svg
      width="24"
      height="24"
      display="block"
      viewBox="0 0 24 24"
      style={{ width: "24px", height: "24px" }}
    >
      <path fill="white"
       strokeWidth={"3px"} d="M12.71 12l8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
    </svg>
  );
}

