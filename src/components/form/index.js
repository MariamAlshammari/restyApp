import './form.scss';
import {useState , useEffect} from "react";

function Form  (props) {

  const [url , setUrl] = useState('https://jordan-black-iris.herokuapp.com/places');
  const [method , setMethod] = useState('GET');
  const [body, setbody] = useState([]);
  const [bodyData,setbodyData]=useState("");
  const [ShowBody, setShowBody] = useState(false);

 function handleSubmit  (e)  {
    e.preventDefault();
    e.target.reset();
    
    bodyData && setbody([...body, bodyData]);
    const formData = {
      method:`${method}`,
      url: `${url}`,
      bodyData: `${bodyData}`,
    };
    props.handleApiCall(formData);   
  }

function handleUrlChange(e) {
    setUrl(e.target.value);
}

function handleMethodChange(e) {
  setMethod(e.target.innerText);
  e.target.innerText === 'POST' || e.target.innerText === 'PUT'
  ? setShowBody(true)
  : setShowBody(false);

}
function handleBodyData(e) {
  setbodyData(e.target.value);
  console.log(bodyData);
}
  // 1- on EVERY re-render of this component
  useEffect(() => {
    console.log("I RUN ON EVERY RE-RENDER");
  });

  // 2- This runs only when the name changes
  useEffect(() => {
    console.log("NAME CHANGED TO", bodyData);
    document.title = 'bodyData';
  }, [bodyData]);

  // 3- This runs only once on the initial rendering
  // (this could be a good use case for doing a GET from an API to pre-load
  // the data)
  useEffect(() => {
    console.log("I RUN ONLY ON INITIAL MOUNT");
  }, []);

  // 4- this runs only when the form is submitted (name added)
  // we can use this for post and put requests (api)
  useEffect(() => {
    console.log("I RUN ON BODY ADDED");
    if (body.length >= 1) {
      document.title = 'body';
    }
  }, [body]);


//   useEffect(() => {
//     return () => {
//         //the unmount will only be called when the user.id is changed
//     }
//   }, [user.id]);

/*
  user
    id = null
    name
    email
    password
*/

  //   useEffect(() => {
  //     console.log("I RUN ON PERSON ADDED");
  //     if (people.length >= 1) {
  //       document.title = name;
  //     }
  //   }, [people, name]);

  // 5- this effect has a cleanup job (componentDidUnmount)
  // this could be in of the above cases
  // will do it in isolation for the demo
  useEffect(() => {
    //   askldjfalskd;fj
    return () => {
      console.log("I RUN WHEN COMPONENT UNMOUNTED");
    };
  });
  
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
          {ShowBody && (
          <textarea name='bodyData' type='text' onChange={handleBodyData}   rows="10"
                cols="35"></textarea>
          )}
        </form>
          {body.map((data) => (
        <p key={data}>{data}</p>
      ))}
      </>
    );
  }


export default Form;