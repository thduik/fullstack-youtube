import { useState } from "react"
import DropdownArrowDownIcon from "../../icons/DropdownArrowDownIcon"

const ViewMoreRepliesButton = ({ iconComp = null, onClick, width = "100px", height = "30px", text = null
    //BColor = BackgroundColor
    , idleBColor = "rgba(0,0,0,0)"
    , hoverBColor = "rgba(62, 166, 255, 0.5)"
    , mouseDownBColor = "rgba(255, 255, 255, 0.2)"
    , textColor = "rgba(62, 166, 255, 1)"
    , fontSize = "12px"
    , textDivHeight = "30px"
    , textMarginTop = "8px"
    , textFontWeight = "bold"
}
) => {
    const [hovering, setHovering] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedButton = () => onClick()
    const mouseDowned = () => { setMouseDown(true) }
    const mouseUpped = () => { setMouseDown(false) }


    return (
        <div className="hover-pointer" style={{
            width: "115px",
             height: height, display: "flex", flexDirection: "row", justifyContent: "center", borderRadius: "15px", border: "none"
            , backgroundColor: hovering ?
                mouseDown ? mouseDownBColor : hoverBColor
                : idleBColor
        }}
            onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick={clickedButton}
            onMouseDown={mouseDowned} onMouseUp={mouseUpped}>
            <div style={{ marginTop: "3px", marginLeft:"5px" }}>
                {<DropdownArrowDownIcon fillColor="rgba(62, 166, 255, 1)" />}
            </div>
            {text ? <div style={{ width:"80px", height: textDivHeight, textAlign: "left" }}>
                <p style={{ color: textColor, fontSize: fontSize, marginTop: textMarginTop, fontWeight: textFontWeight }}>
                    {text}
                </p>
            </div> : null}

        </div>
    )
}

export default ViewMoreRepliesButton;