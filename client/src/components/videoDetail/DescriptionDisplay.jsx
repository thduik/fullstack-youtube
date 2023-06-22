import { useState, useEffect } from "react"
// "rgba(62, 166, 255, 1)" "#065fd4"
const DescriptionDisplay = ({text=''}) => {
    const [componentArr, setComponentArr] = useState([])
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
        console.log("textDisplay", res)
    },[text])

    return (
        <div style={{color:"white", fontSize:"14px", backgroundColor:"rgba(233, 233, 233, 0.3)", padding:"20px"}}>
            {componentArr}
        </div>
    )
}

export default DescriptionDisplay;