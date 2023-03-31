import '../styles/PostingPopupInput.css';

const PostingPopupInput = (props) => {
    const{label, onChange, id, ...inputProps} = props;
    return (
        <div className="form-popup">
            {/*<label>{label}</label>*/}
            <input className="input-popup" {...inputProps} onChange={onChange}/>
        </div>
    );
}

export default PostingPopupInput