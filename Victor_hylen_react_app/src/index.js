import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";

function Table(props) {

  useEffect(() => {
    setInterval(() => {
      fetch('http://localhost:3000/api/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
      
      })
    
    .then(res => res.json())
    .then(response => {
      const element = <Table list={response} />; 
      ReactDOM.render(element, document.getElementById("index"))
      console.log(response);

    });
  }, 3000);
}, []);

  console.log(props.list);
  return (
    
    <div className="App">
      
      <table id = "table">
        
        <tr>
        <th onClick={() => sortID(props.list)}>Tag id</th>
          <th onClick={() => sortName(props.list)}>name</th>
          <th onClick={() => sortCourse(props.list)}>course name</th>
          <th onClick={() => sortDate(props.list)}>registration id</th>
        </tr>
        {props.list.map((val, key) => {
          return (
            <tbody>
            <tr key={key}>
              <td>{val.student_id}</td>
              <td>{val.student_name}</td>
              <td>{val.course_name}</td>
              <td>{val.registation_time}</td>
            </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  );
}

fetch('http://localhost:3000/api/info', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json'
  },

})
.then(res => res.json())
.then(response => {

    const element = <Table list={response} />; 
    ReactDOM.render(element, document.getElementById("index"))

    console.log(response);
  });






  //sorting
  function sortName(response){
    
    response.sort((a, b) => a.student_name.toLowerCase() > b.student_name.toLowerCase() ? 1 : -1);

    const element = <Table list={response} />; 
    ReactDOM.render(element, document.getElementById("index"))
  }

  function sortCourse(response){
    
    response.sort(function(a, b){
      var nameA = a.course_name.toLowerCase(), nameB = b.course_name.toLowerCase();
      if (nameA < nameB)
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; 
     });

    const element = <Table list={response} />; 
    ReactDOM.render(element, document.getElementById("index"))
  }




function sortID (response){
    
     response.sort((a, b) => a.student_id - b.student_id);

     const element = <Table list={response} />; 
     ReactDOM.render(element, document.getElementById("index"))
    
    
}



function sortDate (response) {


  response.sort(function(a, b){
    var nameA = a.registation_time.toLowerCase(), nameB = b.registation_time.toLowerCase();
    if (nameA < nameB)
     return -1;
    if (nameA > nameB)
     return 1;
    return 0; 
   });

  const element = <Table list={response} />; 
  ReactDOM.render(element, document.getElementById("index"))



}









