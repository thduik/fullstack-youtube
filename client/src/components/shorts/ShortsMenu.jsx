import { useEffect } from "react"
import { normalFontColor } from "../../configs"
import CommentIcon from "../../icons/CommentIcon"
import LikeIcon from "../../icons/LikeIcon"
import LikeIconB from "../../icons/LikeIconB"
import ShareIcon from "../../icons/ShareIcon"
import StandardRoundButton from "../StandardRoundButton"
import useShortsMenuStats from "../../hooks/useShortsMenuStats"

const ShortsMenu = ({ onClick = () => { }, data,videoId }) => {
    const {stats:{likeCount, commentCount, viewCount},setVideoId} = useShortsMenuStats()
    const clickedButton = (e) => {  onClick(e) }
    useEffect(()=>{
        console.log('ShortsMenu rendered',videoId)
        setVideoId(videoId)
    },[videoId])
    return (
        <div style={{ 
            display: "flex", justifyContent: "center", flexDirection: "column", marginTop:'30px', position:'relative', marginRight:'5px', marginLeft:'auto' }}>
            <div style={{marginTop:'10px', marginBottom:'10px', textAlign:'center'}}>
                <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<LikeIconB height="30px" width="30px" viewBox="-5 -9 40 40" />}
                    onClick={() => { clickedButton('like') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{likeCount ?? '999m'}</p>
            </div>

            <div style={{marginTop:'10px', marginBottom:'10px', textAlign:'center'}}>
                <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<LikeIconB height="30px" width="30px" viewBox="-5 -9 40 40" />}
                    onClick={() => { clickedButton('like') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{videoId.substring(0,5)}</p>
            </div>
            <div style={{marginTop:'10px', marginBottom:'10px', textAlign:'center'}}>
                <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<CommentIcon height="30px" width="30px" viewBox="-4 -12 40 40" />}
                    onClick={() => { clickedButton('comment') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{commentCount ?? '99k'}</p>
            </div>
            <div style={{marginTop:'10px', textAlign:'center'}}>
            <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<ShareIcon height="30px" width="30px" viewBox="-4 -10 40 40" />}
                    onClick={() => { clickedButton('share') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{'Share'}</p>
            </div>

        </div>
    )
}

export default ShortsMenu;