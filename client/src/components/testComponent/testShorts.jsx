import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const TestShorts = ({currIdx}) => {
    const { shortsArr } = useSelector((state) => state.shorts)
    const [displayArr, setDisplayArr] = useState(true)
    const toggleDisplay = () => { setDisplayArr(!displayArr) }
    useEffect(()=>{

    },[currIdx])
    return (
        <div style={{ height: '60px', width: '100px', backgroundColor: 'green', position:'fixed', marginLeft:'0px', marginRight:'auto', zIndex:10 }}>
            <div style={{height:'50px'}} onClick={toggleDisplay} >
                <p style={{fontSize:'30px'}}>TOGGLE DISPLAY</p>
            </div>
            <div style={{
                position: 'fixed', height: '100%', width: '60px', marginLeft: '0', marginTop: '20px', flexDirection:'column', overflow:'auto'
                
                , display:displayArr ? 'flex' : 'none'}}>
                    <p style={{fontSize:'20px', color:"white"}}>{currIdx}</p>
                {shortsArr.map((o, idx) => {
                    const imgUrl = o?.short?.thumbnails?.length ? o.short.thumbnails[0].url : createShortThumbnailUrl(o?.short?.videoId)
                    return <img src={imgUrl} height={'120px'} width={'60px'} style={{ borderRadius: '20px'
                ,border:currIdx == idx ? '2px solid white' : 'none' }}/>
                })}

            </div>

        </div>

    )
}

export default TestShorts;