import { useState, useEffect } from "react"
// "rgba(62, 166, 255, 1)" "#065fd4"
const DescriptionDisplay = ({text=''}) => {
    const [componentArr, setComponentArr] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [showingMore, setShowingMore] = useState(false)
    const [hovering, setHovering] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    const mouseEntered = () => { setHovering(true) }
    const mouseLeft = () => { setHovering(false) }
    const clickedButton = () => {
        setShowingMore(true)
    }
    const mouseDowned = () => { setMouseDown(true) }
    const mouseUpped = () => { setMouseDown(false) }

    useEffect(()=>{
        var textArr = text.split('\n')
        const res = textArr.map(o=>{
            if (o=='') { return <br/>}
            //start by split. even is string starts with https// ("https//:fuckyou.com is a great site"), the result will be ["","fuckyou.com is a great site"].
            //notice 0th element will be "" in that case. we can always start from 1st index element (arr[1])
            var arr = o.split('https://')
            for (var i = 1;i < arr.length; i++) {
                var strWithUrl = arr[i].split(' ')
                //string with url is 0th element. examlpe "https//fuck.com is great stuff" => [""https//fuck.com", "is", "great"]
                const urlAComp = <a style={{color:"rgba(62, 166, 255, 1)"}} href={`https://${strWithUrl[0]}>`}>{`https://${strWithUrl[0]}`}</a>
                strWithUrl[0] = ''
                arr[i] =   [urlAComp, strWithUrl.join(' ')]
            }
            return <p>{[...arr]}</p>
        })
        setComponentArr(res)
        setShowingMore(false)
        if (res.length > 4) {setHasMore(true)}
        else {setHasMore(false)}
        console.log("textDisplay", res)
    },[text])

    useEffect(()=>{

    }, [hasMore, showingMore])
    return (
        <div className={hasMore && !showingMore ? "hover-pointer" : "none"}
        style={{color:"white", fontSize:"14px",  padding:"20px" ,borderRadius:"15px"
            ,backgroundColor:hasMore && !showingMore && hovering ?
            mouseDown ? "rgba(255,255,255, 0.5)" : "rgba(255,255,255, 0.4)"
            : "rgba(255,255,255, 0.3)"}}
        onMouseEnter={mouseEntered} onMouseLeave={mouseLeft} onClick={clickedButton}
            onMouseDown={mouseDowned} onMouseUp={mouseUpped}>
            { (hasMore && !showingMore) ? componentArr.slice(0,5) : componentArr} 

            {hasMore && !showingMore ? <p>...Show more</p> : null}
        </div>
    )
}

export default DescriptionDisplay;