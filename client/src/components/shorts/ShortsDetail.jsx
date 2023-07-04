import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";

const ShortsDetail = () => {

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
            <div>
                <ReactPlayer playing={id ? true : false} muted={true} onEnded={videoPlayEnded} url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

            </div>
        </div>
    )
}