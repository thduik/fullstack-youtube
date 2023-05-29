import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { testApi, logoutApp, testCookies, testYoutubeSearchWithToken } from '../../utils/testApi';

const TestDropdown = () => {
    const dispatch = useDispatch()
    const {googleAccessToken} = useSelector((state)=>state.user)
    const logoutClicked = () => { 
        dispatch(logout())
        logoutApp() 
    }
    const testApiii = () => {
        testApi()
    }
    const testYoutubeSearchTokenClicked = async () => {
        console.log("testYoutubeSearchTokenClicked")
        try {
            const res = await testYoutubeSearchWithToken(googleAccessToken)
            console.log("testYoutubeSearchTokenClicked success", res)
        } catch (err) {
            console.log("testYoutubeSearchTokenClicked error", err)
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={testApiii}>Test Api</button>
            <button onClick={logoutClicked}>Log out</button>
            <button onClick={testCookies}>Test Cookies</button>
            <button onClick={testYoutubeSearchTokenClicked}>Test Search</button>
        </div>
    )
}

export default TestDropdown;