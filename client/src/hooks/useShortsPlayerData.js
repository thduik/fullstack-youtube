import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useShortsPlayerData = () => {
    const { shortsArr, isStreaming, isChannelShorts } = useSelector((state) => state.shorts)
    const [snapType, setSnapType] = useState('none')

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
    return {snapType}

}

export default useShortsPlayerData;