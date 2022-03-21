import './SearchInput.css';
import { useState } from "react";

const SearchInput = (props) => {
    const [input, setInput] = useState('');
    function inputValueChange (e) {
        setInput(e.target.value);
    }

    return (
        <div className='search-input'>
            <p>I am a Search Bar</p>
            <input value={input} onChange={inputValueChange}/>
        </div>
    );
};

export default SearchInput;