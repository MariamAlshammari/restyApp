// import React from 'react';
import axios from 'axios';
import {   React,useState, useEffect,useReducer } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import History from './components/history'
import Results from './components/results';

const initialState = {
  // show: "Sesame Street",
  requests: [],
  // active: {},
};

function requestsReducer(state, action) {
  console.log("action......", action)
  console.log("state =", state)

  switch (action.type) {
    case "ADD_REQUEST":
      const requests = [...state.requests, action.payload];
      return {
        // ...state,
        // active: {},
        requests
      };
      // case "ACTIVE_REQUEST":
      // return {
      //   ...state,
      //   active: state.requests.filter(
      //     (req) => req.requests === action.payload
      //   )[0]
      // };
    
    default:
      return state;
  }
}

function addRequest(requestParams, data) {
  return {
    type: 'ADD_REQUEST',
    payload: {
      url: requestParams.url,
      method: requestParams.method,
      result: data,
    },
  };
}

function App() {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: null,
  //     requestParams: {},
  //   };
  // }
  const [state, dispatch] = useReducer(requestsReducer, initialState);

  const [data, setdata] = useState("");
  const [requestParams, setrequestParams] = useState({});



  async function callApi(requestParams){
    setrequestParams(requestParams)
    console.log(state.requests);
  }
  useEffect(async () => {
    try {
      let resData = await axios.get(requestParams.url);
      const data = {
              count: resData.data.length,
              results: resData.data,
              url: requestParams.url,
              method: requestParams.method,
            };
      const action = {
              type: "ADD_REQUEST",
              payload: data,
            };      
        
            setdata({ data, requestParams });
            dispatch(addRequest(requestParams,action));
    } catch (e) {
  
      setdata(null);
    }
  }, [requestParams]);
  // function handleActiveRequest(requests) {
  //   const action = {
  //     type: "ACTIVE_REQUEST",
  //     payload: requests,
  //   };
  //   dispatch(action);
  // }

//   callApi = async (requestParams) => {

//     let resData = await axios.get(requestParams.url);
// console.log(resData);

//     // mock output
//     const data = {
//       count: resData.data.length,
//       results: resData.data
//     };

//     this.setState({ data, requestParams });
//   }

  
    return (
      <>
        <Header />
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        {/* <strong>
          
        {state.active.url
          ? `${state.active.url} is ${state.active.count}`
          : "Click a character name to show their info"}
      </strong> */}
      
        <Form handleApiCall={callApi} />
        <History handleApiCall={callApi} requestHistory={state.requests}
        //  show={state.show} handleActiveRequest={handleActiveRequest}
         />

        <Results data={data} />
        <Footer />
      </>
    );
  }


export default App;