import { useEffect, useState } from "react"
import CheckmarkIcon from "../../icons/CheckmarkIcon"
import SquareIcon from "../../icons/SquareIcon"
import './index.css'

const PlaylistSelectItem = ({ playlist, selectPlaylistItem, unselectPlaylistItem, idx }) => {
    const [selected, setSelected] = useState(false) //whether this item (playlist) is selected add the video to
    const [hovering, setHovering] = useState(false)
    const changeSetSelected = () => {
        if (!selected) {selectPlaylistItem(idx)}
        if (selected) {unselectPlaylistItem(idx)}
        setSelected(!selected)
    }
    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }

    // useEffect(()=>{
    //     if (selected==true) {  selectThisItem(playlist) }
    // },[selected])
    return (
        <div className="hover-pointer" onMouseEnter={mouseEntered} onMouseLeave={mouseLeft}
            style={{    
                display: "flex", flexDirection: "row"
                ,padding: "8px 5px 0px 18px"
                , backgroundColor: hovering ? "gray" : "rgba(0,0,0,0)"
                ,
            }}  onClick={changeSetSelected}>
            <div style={{ height: "32px" }}
            >
                {selected ?
                    <div
                        style={{
                            marginTop: selected ? "-2px" : "0"
                            , marginLeft: selected ? "-2px" : "0"
                        }}><CheckmarkIcon viewbox="0 0 30 30" /></div> : <SquareIcon />}
            </div>
            <div>
                <p style={{ color: "white", fontSize:"14px", marginTop:"3px",marginLeft:"18px"
            ,textAlign:"left" }}>{playlist.playlistName}</p>
            </div>

        </div>
    )
}

export default PlaylistSelectItem;