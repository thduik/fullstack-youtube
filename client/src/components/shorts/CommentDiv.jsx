import useCommentHook from "../../hooks/useCommentHook"


const CommentDiv = () => {
    const [comments, videoId] = useCommentHook()
    return (
        <div style={{height:'100%',width:'100%'}}>
            {comments}
        </div>
    )
}

export default CommentDiv;