import { useSelector, useDispatch } from "react-redux"

const Playlists = () => {
    const { playlists } = useSelector((state) => state.playlist)
    
    return (
        <div>
            {playlists.map(o=><PlaylistCard playlist={o}/>)}
        </div>
    )
}