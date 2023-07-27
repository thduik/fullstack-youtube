import { useEffect, useState } from "react"

//'player-center' + 'comment-inactive-hide' means player is centered and commentDiv is hidden
//'player-left' + 'comment-active-show' means player is shifted to left a bit and commentDiv is shown, taking some center space (if on PC)
// player div will shift from 'player-center' to 'player-left'
// comment div will shift from 'comment-inactive-hide' to 'comment-active-show' accordingly

const playerClassNameArr = ['player-center', 'player-left']
const commentClassNameArr = ['comment-inactive-hide','comment-active-show']


const useShortsVideoPlayer = () => {
    const [playerClassName, setplayerClassName] = useState('player-center')
    const [commentClassName, setcommentClassName] = useState('comment-inactive-hide')
    const [currStateIdx, setCurrStateIdx] = useState(0)


    const toggleCommentShow = () => {
        setCurrStateIdx((currStateIdx+1)%2)
    }

    useEffect(()=>{
        setplayerClassName(playerClassNameArr[currStateIdx])
        setcommentClassName(commentClassNameArr[currStateIdx])
    },[currStateIdx])

    return {playerClassName, commentClassName, toggleCommentShow}
}