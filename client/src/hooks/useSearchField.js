import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearchField = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
    const onhandleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    };
    const handleOnChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return {searchTerm, handleOnChange, onhandleSubmit}

}

export default useSearchField;