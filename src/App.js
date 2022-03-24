import './App.css';
import SaveList from "./components/SaveList";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";

import { useState } from "react";


function App() {
    const [input, setInput] = useState([]);
    const [save, setSave] = useState(['(none)']);
    const [outputDescription, setOutputDescription] = useState('');
    const [loading, setLoading] = useState(false);


    return (
        <div className="App">

            <main className="container">
                <h1>Rhyme Finder (579 Problem Set 6)</h1>
                <SaveList saveWords={save}/>
                <SearchBar search={setInput} outputDescription={setOutputDescription} setLoading={setLoading}/>
                <ResultList inputValue={input} save={setSave} outputDescription={outputDescription} loading={loading}/>
            </main>

    </div>
  );
}

export default App;
