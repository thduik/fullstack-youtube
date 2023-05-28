import { useDispatch } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { testApi, logoutApp, testCookies } from '../../utils/testApi';

const TestDropdown = () => {
    const dispatch = useDispatch()
    const logoutClicked = () => { 
        dispatch(logout)
        logoutApp() 
    }
    const testApiii = () => {
        testApi()
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={testApiii}>Test Api</button>
            <button onClick={logoutClicked}>Log out</button>
            <button onClick={testCookies}>Test Cookies</button>

        </div>
    )
}

export default TestDropdown;