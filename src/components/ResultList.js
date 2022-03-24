import './ResultList.css';
import ResultItem from "./ResultItem";
import {useEffect, useState} from "react";

const ResultList = (props) => {

    let results = [];
    let resultItems = [];
    const [load, setLoad] = useState('');

    function pluralize(num) {
        if(num == 1) {
            return '';
        } else {
            return 's';
        }
    }

    useEffect(()=>{
        if(props.loading){
            console.log('loading');
            setLoad('...loading');
        }
        else{
            console.log('loaded');
            setLoad('');
        }
    }, [props.loading])

    //props.inputValue will be like:
    //rhyme: [1, abc, def, 2, ghi]
    //synonyms: [abc, def, ghi]
    //If the user want to find synonyms (the beginning of the array WON'T be number)
    //I add a <ul> here and push items(synonyms) into it later
    if(typeof props.inputValue[0] != "number"){
        results.push(<ul key="synonyms-result">{resultItems}</ul>);
    }
    props.inputValue.forEach((item, index) => {
        //console.log('item:', item);

        //If the datatype = number, which means it is a number of syllables
        //Add <h3> first and then add a <ul> following each <h3>, and push items(rhymes) into <ul> later
        if(typeof item == "number"){
            results.push(
                <h3 key={`${item}-syllables`}>{item} syllable{pluralize(item)}</h3>
            );
            resultItems = [];
            results.push(<ul key={item}>{resultItems}</ul>);
        }
        else{
            //console.log("typeof item:", typeof item);
            resultItems.push(
                <ResultItem key={index} content={item} save={props.save}/>
            )
        }
    })

    //check props.outputDescription.length to make sure that "no results" only shows after search, not appear at the first
    if(props.outputDescription.length && !props.inputValue.length && load !== "...loading"){
        results.push(
            <p key="no-result">no result</p>
        )
    }


    return (
        <div className="row">
            <h2 className="col" id="output_description">{props.outputDescription}</h2>
            <div className="output row">
                <p>{load}</p>
                <output id="word_output" className="col"> {results} </output>
            </div>

        </div>
        );
};

export default ResultList;