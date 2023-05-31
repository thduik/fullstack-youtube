
import { useState } from "react"

const createButtonStyle = {
    marginRight: "16px", marginLeft: "auto",
    width: "68px", borderRadius: "20px", height: "40px", textAlign: "center"
}


const ConfirmCreateButton = ({onClick}) => {
    const [buttonHover, setButtonHover] = useState(false)
    const mouseEnteredButton = () => { setButtonHover(true) }
    const mouseLeftButton = () => { setButtonHover(false) }

    return (
        <div className="hover-pointer" style={{
            ...createButtonStyle
            , backgroundColor: buttonHover ? "rgba(6, 95, 212, 0.4)" : "rgba(0,0,0,0)"
        }}
            onClick={onClick} onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton}>
            <p style={{ color: "#3ea6ff", fontSize: "15px", paddingTop: "11px" }}>
                {"Create"}
            </p>
        </div>
    )
}

export default ConfirmCreateButton;

