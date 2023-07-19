import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useSuggestMargin = () => {
    const [marginLeft, setMarginLeft] = useState('0')
    const { innerWidth, innerHeight } = useSelector((state) => state.windowRedux)
    
    useEffect(()=>{
        if (innerWidth < 350) { setMarginLeft('-63px'); return}
        setMarginLeft('-40px')
    },[innerWidth])

    return {suggMarginLeft:marginLeft}
}

export default useSuggestMargin;