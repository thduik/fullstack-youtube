import { useState } from "react"

const SuggestionChoice = ({ text, idx,onClick}) => {

    const [buttonHover, setButtonHover] = useState(false)
    const mouseEnteredButton = () => { setButtonHover(true) }
    const mouseLeftButton = () => { setButtonHover(false) }
    const clickedButton = () => {onClick(text)}

    return (
        <div onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton} onClick = {clickedButton}
         style={{ backgroundColor:buttonHover ? "gray" : "rgba(0,0,0,0)",
            height: '30px', marginTop:'0px', paddingTop:'11px', paddingLeft:'40px' }} >
            <p style={{ color: 'white', fontSize: '14px' }}>{text ?? 'lol'}</p>
        </div>
    )

}

export default SuggestionChoice;