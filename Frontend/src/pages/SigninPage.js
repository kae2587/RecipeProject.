import React, { useState } from "react";


function SignIn() {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const handleSubmit = async(event) => {

    event.preventDefault(); 
     
      if (username === '' || password ===''){
          alert("Missing username and/or password")
          return;
      }


     const user = {
      username,
      password
    };


   // const response = await fetch(' http://localhost:8001/login', {
    const response = await fetch(' https://recipeproject-2.onrender.com/login', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
      body: JSON.stringify(user) // converts the user object into a json string so that it can be sent to the request body because it is currently a javascript object.
    })

  if (response.ok){
    const data = await response.json();
    if (data.message){
      window.location.href = "/yourrecipe";
    }
    else if (data.error){
      alert(data.error);
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
<div style={styles.fullpage}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Sign in</h1>

        <label htmlFor="username" style={styles.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={isHovering ? styles.hoverbutton : styles.button}
        >
          Sign In
        </button>
      </form>
    </div>
    </>


  );
}




const styles = {
  fullpage: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#97AFCB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: "4rem",
    fontFamily: "'Georgia', serif",
    textAlign: "center",
    color: "#000000",
    marginBottom: "2rem",
  },


  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    border: "3px solid #000",
    borderRadius: "15px",
    padding: "2rem",
    width: "450px",
  },

  label: {
    fontSize: "1.5rem",
    fontFamily: "'Georgia', serif",
    color: "#000000",
    marginBottom: "1.25rem",
    textAlign: "left",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1.2rem",
    borderRadius: "15px",
    border: "1px solid #000",
    marginBottom: "1rem",
    boxSizing: "border-box",
  },

  button: {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "2px solid #000",
    borderRadius: "30px",
    padding: "0.8rem 3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },

  hoverbutton: {
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "2px solid #000",
    borderRadius: "30px",
    padding: "0.8rem 3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};





export default SignIn;



