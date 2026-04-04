import { useEffect, useState } from "react";
import "./App.css";
import { Button, EditableText,InputGroup} from 
"@blueprintjs/core";

function App(){
  let [newName,setNewName]=useState("");
  let [newEmail,setNewEmail]=useState("");
  let [newWebsite,setNewWebsite]=useState("");

  let[users,setUsers]=useState(()=>{
    let locItems=localStorage.getItem("users");
    return locItems?JSON.parse(locItems):[]
  });
  useEffect(()=>{
    if(!users){
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((res)=>res.json())
      .then((data)=>{
        setUsers(data)
      });
    }
  },[])

  useEffect(()=>{
    let items=JSON.stringify(users);
    localStorage.setItem("users",items);
  },[users])

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
    
    }
    }

  function removeUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method:"DELETE"
      }
    )
    .then((res)=>res.json())
    .then(data=>setUsers((users)=> { return users.filter(user=>user.id!==id)}))
  }

  function onChangeHandler(id,key,value){
    setUsers((users)=>{
      return users.map(user=>user.id===id?{...user,[key]:value}:user)
    });
  }

  function updateUser(iD){
    const user=users.find((user)=>user.id===iD)
      fetch(`https://jsonplaceholder.typicode.com/users/${iD}`,

        {
          method:"PUT",
          body:JSON.stringify(user),
          headers: {
            "content-Type":"application/json; charset=UTF-8"
          }
        }
      )
      .then((res)=>res.json())
      
      alert("updated successfully!")
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
        {users.map(({name,email,website,id})=>(
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td><EditableText 
            value={email} 
            onChange={(value=>onChangeHandler(id,'email',value))}/> 
            </td>
            <td><EditableText value={website}
             onChange={(value=>onChangeHandler(id,'website',value))}
            />
            </td>
            <td><Button intent="primary "
            onClick={()=>updateUser(id)}>update</Button></td>
            <td><Button intent="danger"
            onClick={()=>removeUser(id)}>delete</Button> </td>
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