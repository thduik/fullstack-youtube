import { useEffect, useState } from "react"

const useCommentHook = () => {
    const [comments, setComments] = useState([])
    const [videoId, setVideoId] = useState(null)
    useEffect(()=>{
        setComments(createSampleCommentArr())
     },[])
    return {comments, setVideoId}
}

export default useCommentHook;


