import './form.scss';
import {useState} from "react";

function Form  (props) {

  const [url , setUrl] = useState('from useState');
  const [method , setMethod] = useState('GET');

 function handleSubmit  (e)  {
    e.preventDefault();
    const formData = {
      method:`${method}`,
      url: `${url}`,
    };
    props.handleApiCall(formData);   
  }

function handleUrlChange(e) {
    setUrl(e.target.value);
}

function handleMethodChange(e) {
  setMethod(e.target.innerText);
}
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={handleUrlChange} />
            <button type="submit">GO!</button>
          </label>
          <label className="methods" >
            <span  id="get" onClick={handleMethodChange}>GET</span>
            <span  id="post"  onClick={handleMethodChange}>POST</span>
            <span  id="put" onClick={handleMethodChange}>PUT</span>
            <span  id="delete"  onClick={handleMethodChange}>DELETE</span>
          </label>
        </form>
      </>
    );
  }


export default Form;