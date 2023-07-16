import { normalFontColor } from "../../configs"
import CommentIcon from "../../icons/CommentIcon"
import LikeIcon from "../../icons/LikeIcon"
import LikeIconB from "../../icons/LikeIconB"
import ShareIcon from "../../icons/ShareIcon"
import StandardRoundButton from "../StandardRoundButton"

const ShortsMenu = ({ onClick = () => { }, data, likeCount = "9999k", commentCount = "9999k" }) => {

    const clickedButton = (e) => { console.log("clickedShortsMenu", e); onClick(e) }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop:'30px' }}>
            <div style={{marginTop:'10px', marginBottom:'10px'}}>
                <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<LikeIconB height="30px" width="30px" viewBox="-5 -9 40 40" />}
                    onClick={() => { clickedButton('like') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{likeCount}</p>
            </div>

            <div style={{marginTop:'10px', marginBottom:'10px'}}>
                <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<LikeIconB height="30px" width="30px" viewBox="-5 -9 40 40" />}
                    onClick={() => { clickedButton('like') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{'Dislike'}</p>
            </div>
            <div style={{marginTop:'10px', marginBottom:'10px'}}>
                <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<CommentIcon height="30px" width="30px" viewBox="-4 -12 40 40" />}
                    onClick={() => { clickedButton('like') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{commentCount}</p>
            </div>
            <div style={{marginTop:'10px'}}>
            <StandardRoundButton height="40px" width="40px" borderRadius="20px"
                    iconComp={<ShareIcon height="30px" width="30px" viewBox="-4 -10 40 40" />}
                    onClick={() => { clickedButton('share') }} />
                <p style={{ color: normalFontColor, fontSize: '14px', marginTop:'4px' }}>{'Share'}</p>
            </div>

        </div>
    )
}

export default ShortsMenu;