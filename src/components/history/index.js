
function History({handleApiCall ,requestHistory}){
    return (
        <>
          <h1>Requests History </h1>
          {/* <strong>
            {state.active.name
              ? `${state.active.name} is ${state.active.color}`
              : "Click a character name to show their info"}
          </strong> */}
          <ul>
              {requestHistory && 
            requestHistory.map((request,idx) =>{return (
              <li key={idx} >
                METHOD :{request.method}
<br/>
                URL :{request.url}   
                <br/>

                <button onClick={() => handleApiCall(request)}>Add request</button>
                         
                   </li>);
            })}
          </ul>
          
        </>
      );
}
export default History;