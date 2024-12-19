import React, { useState } from "react";


function SignIn() {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  
  const handleSubmit = async(event) => {

    event.preventDefault(); 
     

     const user = {
      username,
      password
    };


    const response = await fetch(' http://localhost:8001/login', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(user) // converts the user object into a json string so that it can be sent to the request body because it is currently a javascript object.
    })

  if (response.ok){
    const data = await response.json();
    if (data.message){
      alert(data.message)
    }
    else if (data.error){
      alert(data.error)
    }
    else {
      alert("Something went wrong try again 2")
    }
  }
          else {
        alert("An error occured try again")
          }
  };



  return (
<>
    <h1>Sign In Page</h1> 

    <form onSubmit={handleSubmit}>

    <label htmlFor="username">Username:</label>
    
    <input 
    
      type="text" 
    
      id="username" 
    
      value={username} 
    
      onChange={(e) => setUsername(e.target.value)} 
    
    />




    <label htmlFor="password">Password:</label>
    
    <input 
    
      type="text" 
    
      id="password" 
    
      value={password} 
    
      onChange={(e) => setPassword(e.target.value)} 
    
    />


    <button type="submit">Create User</button>
    </form>
    </>








  );
}

export default SignIn;


