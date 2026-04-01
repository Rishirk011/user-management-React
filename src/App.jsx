import { useEffect, useState } from "react";
import "./App.css";
import { Button, EditableText } from "@blueprintjs/core";
function App(){
  let[users,setUsers]=useState([]);

  useEffect(()=>{
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json())
    .then((data)=>setUsers(data));
  
  },[])

  return <>
    <table>
      <thead>
        <th>name</th>
        <th>email</th>
        <th>website</th>
      </thead>
      <tbody>
        {users.map(({name,email,website,id})=>(
          <tr key={id}>
            <td>{name}</td>
            <td><EditableText value={email}/> </td>
            <td><EditableText value={website}/>
            </td>
            <td><Button intent="primary ">update</Button></td>
            <td><Button intent="danger">delete</Button> </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}
export default App;