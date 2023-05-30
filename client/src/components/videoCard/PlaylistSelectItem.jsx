import { useState } from "react"
import CheckmarkIcon from "../../icons/CheckmarkIcon"
import SquareIcon from "../../icons/SquareIcon"

const PlaylistSelectItem = ({playlist}) => {
    const [selected, setSelected] = useState(false)
    const changeSetSelected = () => {
        setSelected(!selected)
    }
    return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div onClick = {changeSetSelected}>
                {selected ? <CheckmarkIcon/> : <SquareIcon/>}
            </div>
            <p>{"playlist name here"}</p>
        </div>
    )
}

export default PlaylistSelectItem;