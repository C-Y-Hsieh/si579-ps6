import './SaveList.css';

const SaveList = (props) => {

    return <div className="row">
        <div className="col">Saved words: <span id="saved_words">{props.saveWords.join(', ')}</span></div>
    </div>

};

export default SaveList;