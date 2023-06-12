import { useSelector, useDispatch } from "react-redux"
import PlaylistCard from "./PlaylistCard"
import './index.css'
const PlaylistsPage = () => {
    const { playlists } = useSelector((state) => state.playlist)

    return (
        <div className="playlists-page" style={{backgroundColor:"green"}}>
            <div style={{ display: "flex", flexDirection: "row", flexWrap:"wrap"
        , justifyContent:"center" }}>
                {playlists.map(o => <PlaylistCard playlist={o} />)}
            </div>
        </div>
    )
}


export default PlaylistsPage;