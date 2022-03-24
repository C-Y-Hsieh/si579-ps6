import './ResultItem.css';
import saveList from "./SaveList";

const ResultItem = (props) => {

    function addToSavedWords(){
        props.save((preValue) => {
            if(preValue[0] == '(none)'){
                return [props.content];
            }
            else{
                return [...preValue, props.content];
            }
        }
        );
    }
    return <li >
        {props.content}
        <span> <button onClick={addToSavedWords}>save</button></span>
    </li>

};

export default ResultItem;