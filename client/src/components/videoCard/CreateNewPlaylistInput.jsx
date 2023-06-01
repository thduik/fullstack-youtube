import { useState } from "react"
import ConfirmCreateButton from "./ConfirmCreateButton"
import './index.css'
import PrivacyDropdown from "./PrivacyDropdown"

const pStyle = { color: "white", margin: "10px auto 2px 17px", fontSize: "14px" }

const CreateNewPlaylistInput = ({ createPlaylistConfirmed }) => {
    const [name, setName] = useState("")
    const [privacyText, setPrivacyText] = useState("Private")
    const [inputTextEmpty, setInputTextEmpty] = useState(true)
    const [inputIsFocused, setInputIsFocused] = useState(false)
    const [createButtonWasClicked, setCreateButtonWasClicked] = useState(false)
    const createNewPlaylistClicked = () => {
        console.log("createNewPlaylistClicked", name, privacyText)
        setCreateButtonWasClicked(true)
        if (inputTextEmpty) { return }
        createPlaylistConfirmed({name:name, privacy:privacyText})
    }

    const inputFocus = () => {
        console.log("inputFocus")
        setInputIsFocused(true)
    }
    const inputBlur = () => {
        console.log("inputBlur")
        setInputIsFocused(false)
    }
    const inputChanged = (e) => {
        const text = e.target.value
        console.log("inputChanged text is", text)
        if (text.length == 0) { setInputTextEmpty(true) }
        if (text.length > 0) { setInputTextEmpty(false) }
        setName(text)
    }

    const privacyChanged = (text) => {
        console.log('CreateNewPlaylistInput privacyChanged called', text)
        setPrivacyText(text)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center"
            }}>
                <p style={pStyle}>{'Name'}</p>
                <input onChange={inputChanged} onBlur={inputBlur} onFocus={inputFocus} className="create-playlist" placeholder="Enter here bitch"
                    style={{
                        borderBottom: inputIsFocused ?
                            inputTextEmpty && createButtonWasClicked ? "2px solid red" : "2px solid white"
                            :
                            "2px solid rgba(0,0,0,0)"
                    }}></input>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <p style={{
                        color: inputTextEmpty ? "red" : "white"
                        , fontSize: "12px", marginLeft: "18px"
                        , display: createButtonWasClicked ? "inline" : "none"
                    }}>
                        Required
                    </p>
                    <p style={{
                        color: inputTextEmpty ? "red" : "white"
                        , fontSize: "12px", marginRight: "18px"
                    }}>{name.length}{"//150"}</p>
                </div>
            </div>

            <div style={{ marginTop: "10px" }}>
                <PrivacyDropdown privacyChanged={privacyChanged} />
            </div>
            <div style={{ marginTop: "5px" }}>
                <ConfirmCreateButton onClick={createNewPlaylistClicked} />
            </div>

        </div>
    )
}

export default CreateNewPlaylistInput;