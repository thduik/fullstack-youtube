import { useState } from "react"


const StandardRoundButton = ({ iconComp = null, onClick, width = "30px", height = "30px", text = null
    //BColor = BackgroundColor
    , idleBColor = "rgba(0,0,0,0)"
    , hoverBColor = "#494949"
    , mouseDownBColor = "#575757"
    , textColor = "white"
    , fontSize = "12px"
    , textDivHeight = "30px"
    , textMarginTop = "8px"
    , textFontWeight = "bold"
    , border = "none"
    , margin = "0px"
    , borderRadius = "15px"
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
            width: width, height: width, display: "flex", flexDirection: "row", justifyContent: "center", border: border
            , margin:margin, borderRadius:borderRadius
            , backgroundColor: hovering ?
                mouseDown ? mouseDownBColor : hoverBColor
                : idleBColor
        }}
            onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick={clickedButton}
            onMouseDown={mouseDowned} onMouseUp={mouseUpped}>

            {iconComp}
            {text ? <div style={{ width: "100%", height: textDivHeight, textAlign: "center" }}>
                <p style={{ color: textColor, fontSize: fontSize, marginTop: textMarginTop, fontWeight: textFontWeight }}>
                    {text}
                </p>
            </div> : null}
            
        </div>
    )
}

export default StandardRoundButton;