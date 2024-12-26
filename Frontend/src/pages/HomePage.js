import React, { useState } from 'react';


function HomePage() {
  const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);
  const [isHoveringSignUp, setIsHoveringSignUp] = useState(false);

  const handleClickSignIn = (action) => {
   // alert(`${action} button clicked!`);
   window.location.href = "/signin";
  };


  const handleClickSignUp = (action) => {
    // alert(`${action} button clicked!`);
    window.location.href = "/signup";
   };

  const handleMouseEnter = () => {
    setIsHoveringSignIn(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringSignIn(false);
  };

  const handleMouseEnterSignUp = () => {
    setIsHoveringSignUp(true);
  };

  const handleMouseLeaveSignup = () => {
    setIsHoveringSignUp(false);
  };




  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <h2 style={styles.subtitle}>A new way to cook</h2>
        <h1 style={styles.title}>The Recipe Page</h1>
        <p style={styles.description}>Carry your recipe book everywhere you go</p>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button onClick={() => handleClickSignIn("Sign In")} onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} style={isHoveringSignIn ?styles.hoverbutton : styles.button }>
            Sign In
          </button>
          <button onClick={() => handleClickSignUp("Sign Up")} onMouseEnter={handleMouseEnterSignUp}
       onMouseLeave={handleMouseLeaveSignup} style={isHoveringSignUp ?styles.hoverbutton : styles.button }>
            Sign Up
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        <img
          src="https://static.toiimg.com/photo/64029527.cms?imgsize=797893" // Replace with your image URL
          alt="Delicious food"
          style={styles.image}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    fontFamily: "'Georgia', serif",
    color: "#ffffff",
  },
  
  leftSection: {
    flex: 1,
    backgroundColor: "#97AFCB", // Matches the light blue shade
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
  },
  button: {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #000",
    borderRadius: "30px",
    padding: "0.8rem 3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
   
  },

  buttonHover: {
    opacity: "0.9",
    //color: "#e7e7e7",
  },

  hoverbutton:{
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "1px solid #000",
    borderRadius: "30px",
    padding: "0.8rem 3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },


  rightSection: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default HomePage;
