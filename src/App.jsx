import { useEffect, useState } from "react";
import "./App.css";
import { Button, EditableText,InputGroup} from 
"@blueprintjs/core";

function App(){
  let [newName,setNewName]=useState("");
  let [newEmail,setNewEmail]=useState("");
  let [newWebsite,setNewWebsite]=useState("");

  let[users,setUsers]=useState([]);

  useEffect(()=>{
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json())
    .then((data)=>setUsers(data));
  
  },[])

  function removeUser(id){
    setUsers(users.filter((temp,index)=>
      id!=index
    ))
  }

  function addUser(){
    
    const name=newName.trim();
    const email=newEmail.trim();
    const website=newWebsite.trim();

    if(name && email && website ){
      fetch('https://jsonplaceholder.typicode.com/users',

        {
          method:"POST",
          body:JSON.stringify({
            name,
            email,
            website
          }),
          headers: {
            "content-Type":"application/json; charset=UTF-8"
          }
        }
      )
      .then((res)=>res.json())
      .then((data)=>{
        setUsers([...users,data]);
        
      })
    
    };
      

    }
  

  return <>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>website</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({name,email,website,id},index)=>(
          <tr key={index}>
            <td>{id}</td>
            <td>{name}</td>
            <td><EditableText value={email}/> </td>
            <td><EditableText value={website}/>
            </td>
            <td><Button intent="primary "
            >update</Button></td>
            <td><Button intent="danger"
            onClick={()=>removeUser(index)}>delete</Button> </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td> 
            <InputGroup 
            value={newName}
            onChange={(e)=>setNewName(e.target.value)}
            placeholder="enter name"
            
          /> 
          </td>
          <td> 
            <InputGroup 
            value={newEmail}
            onChange={(e)=>setNewEmail(e.target.value)}
            placeholder="enter email"
            />
          </td>
          <td> 
            <InputGroup 
            value={newWebsite}
            onChange={(e)=>setNewWebsite(e.target.value)}
            placeholder="enter website"
            />
          </td>
          <td>
            <Button intent="success"
            onClick={addUser}> 
              add
              </Button>
          </td>
        </tr>
      </tfoot>
    </table>
    
  </>
}
export default App;