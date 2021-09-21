// import React from 'react';
import axios from 'axios';
import {   React,useState, useEffect } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: null,
  //     requestParams: {},
  //   };
  // }
  const [data, setdata] = useState("");
  const [requestParams, setrequestParams] = useState({});



  async function callApi(requestParams){
    setrequestParams(requestParams);
  }
  useEffect(async () => {
    try {
      let resData = await axios.get(requestParams.url);
      const data = {
              count: resData.data.length,
              results: resData.data
            };
        
            setdata({ data, requestParams });
    } catch (e) {
  
      setdata(null);
    }
  }, [requestParams]);

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
        <Form handleApiCall={callApi} />
        <Results data={data} />
        <Footer />
      </>
    );
  }


export default App;