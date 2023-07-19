import { useEffect, useState } from "react";
import { autoSuggestApi } from "../middlewares/autoSuggestApi";

const useAutoSuggest = ({ searchTerm, blockSeconds = 2 //block trigger for x seconds, because api rate is very limited
}) => {
    const { useLazyQuery } = autoSuggestApi.endpoints.getAutoSuggestions
    const [trigger, { data, error }] = useLazyQuery()
    const [suggestArr, setSuggestArr] = useState([])
    const [allowTrigger, setAllowTrigger] = useState(true)
    const [lastLength, setLastLength] = useState(0)
    useEffect(() => {
        console.log('useAutoSuggest searchTerm', searchTerm)

        if (searchTerm.length > 3 && searchTerm.length < 20 && searchTerm.length > lastLength && allowTrigger) {
            setAllowTrigger(false)
            trigger(searchTerm)
            setLastLength(searchTerm.length)
            setTimeout(() => { setAllowTrigger(true) }, blockSeconds * 1000)
            return
        }
        setLastLength(searchTerm.length)
        if (searchTerm.length <= 2) {
            setSuggestArr([])
            return
        }
    }, [searchTerm])

    useEffect(() => {
        if (!data ||  !data?.suggestionGroups?.length) { return }
        console.log('useAutoSuggest data', data.suggestionGroups[0].searchSuggestions, data.suggestionGroups)
        setSuggestArr(data.suggestionGroups[0].searchSuggestions) //[{ displayText:string }] example: [{displayText:'zach king'}]
    }, [data])

    return { suggestArr }
}

export default useAutoSuggest;