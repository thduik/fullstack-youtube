import { useEffect, useRef, useState } from "react";
import SuggestionChoice from "./SuggestionChoice";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = ({ suggestArr,marginLeft = '-100px' }) => {
    const navigate = useNavigate()
    const clickedChoice = (text) => {
        console.log('clickedChoice SearchSuggestions',text)
        setShowDropdown(false)
        navigate(`/search/${text}`)
    }
    const ref = useRef(null)
    const [showDropdown, setShowDropdown] = useState(false)
    
    const onClickOutside = () => {
        setShowDropdown(false)
      }
    
    
    useEffect(() => { console.log('SearchSuggestions suggestArr', suggestArr) }, [suggestArr])

    useEffect(()=>{
        if (suggestArr && suggestArr.length ) {
            setShowDropdown(true)
        }
    },[suggestArr])
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            if (onClickOutside) {onClickOutside()}
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [onClickOutside]);

    return (
        <div ref={ref}
            style={{

            position: 'fixed', width: '100%', flexDirection: 'column', marginTop: '40px'
            , display:showDropdown && suggestArr.length ? 'flex' : 'none', zIndex:15
        }}>
            <div 
            style={{
                display:showDropdown && suggestArr.length ? 'flex' : 'none', flexDirection: 'column',
                backgroundColor: '#202020', marginTop: '0px', width: '50vw', minWidth: '300px',
                paddingTop: '12px', paddingBottom: '12px', marginLeft: marginLeft, borderRadius: '15px', position:'fixed', zIndex:20000
            }}>
                {suggestArr.map((o, idx) => <SuggestionChoice key={idx} idx={idx} text={o.displayText} onClick={clickedChoice} />)
                }
            </div>
        </div>
    )
}

export default SearchSuggestions;