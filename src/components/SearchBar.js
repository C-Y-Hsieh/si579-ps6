import './SearchBar.css';
import { useState } from "react";
import { useEffect} from "react";


const SearchBar = (props) => {
    const [input, setInput] = useState('');
    const [rhymeClick, setRhymeClick] = useState(false);
    const [synonymClick, setSynonymClick] = useState(false);

    function inputValueChange (e) {
        setInput(e.target.value);
    }

    function pressEnter(e){
        if (e.keyCode === 13){
            console.log("enter pressed");
            addRhyme();
        }
    }

    function addRhyme(){
        setRhymeClick(!rhymeClick);
        props.setLoading(true);
        props.search([]);
        props.outputDescription(`Words that rhyme with ${input}`);
        /* props.search((preValue) => {
            return [...preValue, input];
        }); */
    }

    function addSynonym(){
        setSynonymClick(!synonymClick);
        props.setLoading(true);
        props.search([]);
        props.outputDescription(`Words with a similar meaning to ${input}`);
    }

    function groupBy(objects, property) {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for(const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    function getDatamuseRhymeUrl(rel_rhy) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': input})).toString()}`;
    }

    function getDatamuseSimilarToUrl(ml) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': input})).toString()}`;
    }

    function printSynonym(data){

        //props.search([]);
        data.forEach((i) => {
            props.search((preValue) => {
                return [...preValue, i.word];
            });
        })
        props.setLoading(false);
    }

    function printRhyme(data){
        const groupedRhyme = groupBy(data, 'numSyllables');
        //console.log('data', data);
        console.log('groupBy:', groupedRhyme);
        

        for (let syllables in groupedRhyme) {
            //console.log("syllables:", syllables);
            //console.log("typeof syllables:", typeof Number(syllables));
            props.search((preValue) => {
                syllables = Number(syllables);
                return [...preValue, syllables];
            });
            for (let words in groupedRhyme[syllables]) {
                //console.log("words:", groupedRhyme[syllables][words]);
                props.search((preValue) => {
                    return [...preValue, groupedRhyme[syllables][words].word];
                });
            }
        }
        props.setLoading(false);


    }

    function datamuseRequest(url, callback){
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // This invokes the callback that updates the page.
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    useEffect((input)=>{
        const url = getDatamuseSimilarToUrl(input);
        /* {
            // not yet resolved!!!!!!!!!!!!!!!!!!
            ResultList.innerHTML = `...loading`;
        } */

        datamuseRequest(url, printSynonym);
        setInput('');
    }, [synonymClick])

    useEffect((input)=>{
        const url = getDatamuseRhymeUrl(input);
        datamuseRequest(url, printRhyme);

        setInput('');
    }, [rhymeClick])

    return (
        <div className='search-input'>
            <input
                className="form-control"
                type="text" placeholder="Enter a word"
                id="word_input"
                value={input}
                onChange={inputValueChange}
                onKeyDown={pressEnter}
            />
            <button
                id="show_rhymes"
                type="button"
                className="btn btn-primary"
                onClick={addRhyme}>
                Show rhyming words
            </button>
            <button
                id="show_synonyms"
                type="button"
                className="btn btn-secondary"
                onClick={addSynonym}
            >
                Show synonyms
            </button>
        </div>

    );
};

export default SearchBar;