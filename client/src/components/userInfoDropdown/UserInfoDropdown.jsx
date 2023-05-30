import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useState, useRef } from 'react';
import { Stack } from "@mui/material";
// import './index.css'
import BlueAccountIcon from '../../icons/BlueAccountIcon';
import { handleGoogleToken } from '../../utils/handleGoogleToken';
import TestDropdown from '../testComponent/TestDropdown';
import { useSelector, useDispatch } from 'react-redux'
import UserDropdownButton from './UserDropdownButton';


const backgroundColor = "rgba(0,0,0,0)" //important because all elements being transparent allow effects to work
const totalWidth = "55px"
const buttonFontColor = "#3ea6ff"


const dropdownMenuWidth = "180px"
const dropdownMenuMarginLeft = "-140px"
const dropdownBackgroundColor = "#171717"
const wrapperStyle = {
    width: totalWidth, paddingTop: "3px",
    paddingLeft: "3px", borderRadius: "26px", border: "1px solid gray"
    , marginRight: "10px"
}
const accountIconDivStyle = {
    backgroundColor: "rgba(0,0,0,0)", width: totalWidth, display: "flex",
    flexDirection: "row"
}

const dropdownDivStyle = {
    position: "fixed", justifyContent: "end", backgroundColor: dropdownBackgroundColor,
    width: dropdownMenuWidth, marginLeft: dropdownMenuMarginLeft, marginTop: "10px",
    border: "1px solid gray",
    padding: "5px 6px 2px 6px", borderRadius: "22px"
}

function UserInfoDropdown() {
    const [showDropdown, setShowDropdown] = useState(false)

    const dispatch = useDispatch()
    const { email, googleid, name, pictureUrl, userId, userName, isLoggedIn } = useSelector((state) => state.user)

    const ref = useRef(null);
    const onClickOutside = () => {
        setShowDropdown(false)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const logOutGoogleClicked = () => {
        console.log("logOutGoogleClicked")
        googleLogout()
    }



    const toggleMenuDisplay = () => {
        const newState = !showDropdown
        setShowDropdown(newState)
    }
    return (
        <div className="comp-wrapper" style={wrapperStyle}>
            <button className="sign-in" style={{ border: "none" }} onClick={toggleMenuDisplay}>
                <div style={accountIconDivStyle}>
                    <img height='30px' width='30px' src={pictureUrl} />
                </div>

            </button>

            <div ref={ref} style={{
                ...dropdownDivStyle, borderBottom: "1px solid gray"
                , display: showDropdown ? "flex" : "none", flexDirection: "column"
            }} >

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ height: "40px", width: "40px" }}>
                        <img height='30px' width='30px' src={pictureUrl} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={{ color: "white" }}>{name}</p>
                        <p style={{ color: "white" }}>{userName}</p>
                    </div>
                </div>

                <UserDropdownButton />
                <TestDropdown />

            </div>
        </div>

    );
}

export default UserInfoDropdown;