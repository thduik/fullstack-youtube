import { useEffect, useState } from "react";
import { changeInnerWidth } from "../features/window";
import { useDispatch } from "react-redux";

const useWidthRedux = () => {
    const [width, setWidth] = useState(0)
    const [window, setWindow] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!window) {console.log("useWidthRedux no window"); return}
        const updateWindowDimensions = () => {
          const newWidth = window.innerWidth;
          setWidth(newWidth);
        };
        // console.log("window.innerWidth",window.innerWidth)
        setWidth(window.innerWidth)
        // const removeEvLis = () => window.removeEventList ener("resize", updateWindowDimensions)
        // const addEvLis = () => window.addEventListener("resize", updateWindowDimensions);
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)
      }, [window]);
    useEffect(()=>{
        
        console.log("useWidthRedux updating width", width)
        dispatch(changeInnerWidth(width))
    },[width])
    return [setWindow]
}

export default useWidthRedux;