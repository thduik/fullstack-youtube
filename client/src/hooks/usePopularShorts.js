import { useEffect, useState } from "react"
import { shortsApiRedux } from "../middlewares/shortsApi"

const shortsPerSlide = 15 //1 slide = 15 shorts, load 15 more shorts at one time slide 1 from 0-14, slide 2 from 15-29
const usePopularShorts = () => {
    const {useLazyQuery, useQuery} = shortsApiRedux.endpoints.getPopularShorts
    // const [trigger, {data, error}] = useLazyQuery()
    const {data, error} = useQuery()
    const [shortsArr, setShortsArr] = useState([])
    const [currSlide, setCurrSlide] = useState(0)
    const [visibleShorts, setVisibleShorts] = useState([])
    useEffect(()=>{
        if (!data || !data?.data?.length) { return }
        console.log('usePopularShorts data', data.data)
        setShortsArr(data)
    },[data])
    useEffect(()=>{
        if (!shortsArr.length) { return }
        setVisibleShorts(shortsArr.slice(currSlide * shortsPerSlide, currSlide * shortsPerSlide + shortsPerSlide))
    },[data, currSlide])

    const loadMoreShorts = () => {
        if (currSlide * shortsPerSlide > shortsArr.length) { return }
        setCurrSlide(currSlide + 1)
    }

    return {shortsArr: visibleShorts, loadMoreShorts:loadMoreShorts}
}

export default usePopularShorts;