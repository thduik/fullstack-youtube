import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { arrayFirst } from "../components/shorts/utils"
import { heightPerShort } from "../components/shorts/dimensions"

const useShortsPlayerData = () => {
    const { shortsArr, isStreaming, isChannelShorts } = useSelector((state) => state.shorts)
    const [snapType, setSnapType] = useState('none')
    const [currIdx, setCurrIdx] = useState(0)
    const [allowChangeIdx, setAllowChangeIdx] = useState(true)

    useEffect(() => {
        if (!shortsArr || !shortsArr.length || currIdx < 0 || currIdx >= shortsArr.length) { 
            console.log("currIdxShortsPlayer useEfect ", currIdx, shortsArr.length, shortsArr)
            return }
        //console.log("currIdxShortsPlayer useEfect ", currIdx, arrayFirst(shortsArr[currIdx]?.short?.thumbnails),shortsArr[currIdx])
        setAllowChangeIdx(false)
        setTimeout(()=>{setAllowChangeIdx(true)},500)
    }, [currIdx])
    
    const hookHandleScroll = (e) => {
        if (!allowChangeIdx) {return}
        setAllowChangeIdx(false)
        let currentIdx = (e.target.scrollTop + 320) / heightPerShort(innerHeight)
        console.log('currentIdxFloat', currentIdx)
        currentIdx = Math.floor(currentIdx)
        if (currentIdx != currIdx && allowChangeIdx) { setCurrIdx(currentIdx) }
        setTimeout(() => {
            setAllowChangeIdx(true)
        }, 400);
    }
    useEffect(() => {
        //trigger videoPlayer change workflow
        // setCurrIdx(0)
        console.log("useEffect shortsArr changed")
        
        if (shortsArr.length > 1) {//default snapType = 'none' to prevent bug. This bug makes
            //page scroll to bottoms as soon as divArr is rendered (mounted). It is not default/normal behavior when array of components
            //is rendered with scrollSnapTyp parent and scrollSnapAlign children. 
            //this workaround of defaulting snapType to 'none' initially is by far the best solution available
            setTimeout(()=>{setSnapType('y mandatory')},200)  
        }
        return () => {
        }
    }, [shortsArr])
    return {snapType,currIdx, setCurrIdx,allowChangeIdx, hookHandleScroll}

}

export default useShortsPlayerData;