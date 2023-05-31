
const ConfirmCreateButton = () => {


    return (
        <div style={{...createButtonStyle, backgroundColor:buttonHover ? "rgba(6, 95, 212, 0.4)" : "rgba(0,0,0,0)"}} 
        onClick={createNewPlaylistClicked} onMouseEnter={mouseEnteredButton} onMouseLeave={mouseLeftButton}>
           <p style={{color:"#3ea6ff", fontSize:"15px", paddingTop:"10px"}}> {"Create"} </p> 
        </div>
    )
}

export default ConfirmCreateButton;

