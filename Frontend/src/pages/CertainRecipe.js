import React, { useState, useEffect } from "react";

function CertainRecipe() {


const [userRecipe, setUserRecipe] = useState([]);
const [id, setId] = useState(0);
//const [imageData, setImageData] = useState(null);


const [headerBools, setHeaderBools] = useState([false, false, false])



const handleDelete = async () => {

const user = {
    _id: id,
  };

  const responsetwo = await fetch(' http://localhost:8001/deleterecipe', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    credentials: 'include', 
    body: JSON.stringify(user) 
  })

  if (responsetwo.ok) {
    alert("Recipe Deleted Successfully");
    window.location.href=  `/yourrecipe`

  }

};

const handleEdit = () =>{
 //  window.location.href = "/editrecipe";

 window.location.href=  `/editrecipe?title=${encodeURIComponent(id)}`

    };

const handleMouseEnter = (id) => {
    setHeaderBools((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[id] = true;
      return updatedStates;
    });
  };
  
  const handleMouseLeave = (id) => {
    setHeaderBools((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[id] = false;
      return updatedStates;
    });
  };


  const getQueryParam = (param) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  };

  const getRecipe = async () => {
    const title = getQueryParam('title');
    if (!title) {
      return;
    }
    setId(title);
   
    const user = {
        _id: title,
      };

      const responsetwo = await fetch(' http://localhost:8001/getCertainRecipe', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
        body: JSON.stringify(user) 
      })

      if (responsetwo.ok) {
        const data2 = await responsetwo.json();
        setUserRecipe(data2);
        
      }

  };

  useEffect(() => {
    getRecipe();
   },  );


return(
<>

<header style={styles.header}>
        <a
          href="/yourrecipe"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
          style={headerBools[0] ? styles.linkHover : styles.link}
        >
          Your Recipes
        </a>


        <a
          href="/mealgenerator"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
          style={headerBools[2] ? styles.linkHover : styles.link}
        >
          Meal Generator
        </a>
      </header>
      <div style={styles.content}>
        {userRecipe.map((listing) => (
          <div key={listing.id} >
            <h2 style={styles.title}>{listing.title}</h2>
            <p style={styles.description}>{listing.description}</p>
            <p style={styles.date}>
              <b>Date Posted:</b> {listing.date.slice(0, 10)}
            </p>

            {listing.photo && listing.photo.data ? (
                <div style={styles.imagediv}>
                    <img 
                        src={`data:${listing.photo.contentType};base64,${listing.photo.data}`} 
                        alt={listing.title} 
                        style={styles.image}
                    />
                    </div>
                    ) : (
                    <div style={styles.imagediv}>
                    <p>No Image</p>
                    </div>
                    )}


            {listing.steps && listing.steps.length > 0 && (
              <div style={styles.stepsContainer}>
                <h3 style={styles.stepsTitle}>
                  <b>Steps:</b>
                </h3>
                <div>
                <div style={styles.recipeContainer}>
                <ul style={styles.stepsList}>
                  {listing.steps.map((step, index) => (
                    <li key={index} style={styles.step}>
                      <b>Step {index + 1}: </b>
                      {step}
                    </li>
                  ))}
                </ul>
                </div>
              </div>
              </div>
            )}

            {listing.steps && listing.steps.length === 0 && (
              <p style={styles.noSteps}>No Steps Provided</p>
            )}

            <div style={styles.buttonContainer}>
              <button 
              onClick={handleEdit}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={() => handleMouseLeave(3)}
                style={headerBools[3] ? styles.buttonHover:  styles.button }
            >
                Edit Recipe
                </button>

              <button 
                onClick={handleDelete}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={() => handleMouseLeave(4)}
                style={headerBools[4] ? styles.buttonHover:  styles.button}
              >
                Delete Recipe
                </button>
            </div>
          </div>
        ))}
      </div>


    </>
);


}const styles = {
    header: {
      display: "flex",
      justifyContent: "space-around",
      backgroundColor: "#577493",
      padding: "1rem",
      fontFamily: "'Georgia', serif",
    },
    link: {
      color: "#ffffff",
      textDecoration: "none",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    linkHover: {
      color: "#000000",
      textDecoration: "none",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    content: {
      padding: "2rem",
      fontFamily: "'Georgia', serif",
    },

    recipeContainer: {
      border: "1px solid #000",
      borderRadius: "10px",
      backgroundColor: "#f4f4f4",
      padding: "2rem 1.5rem",
      margin: "1rem 0",
     
    },

    recipeContainer2: {
        padding: "2rem 1.5rem",
    },

    title: {
      fontSize: "2.5rem",
      textAlign: "center",
      marginBottom: "3rem",
    },
    description: {
      fontSize: "1.2rem",
      textAlign: "center",
      marginBottom: "1rem",
      fontFamily: "'Georgia', serif",
    },
    date: {
      fontSize: "1rem",
      textAlign: "center",
      marginBottom: "2rem",
      fontFamily: "'Georgia', serif",
    },
    stepsContainer: {
      marginBottom: "3.5rem",
      padding: "0rem 20rem",
    },
    stepsTitle: {
      fontSize: "1.75rem",
      marginBottom: "1rem",
      textAlign: "center",
      fontFamily: "'Georgia', serif",
    },
    stepsList: {
      listStyleType: "disc",
      paddingLeft: "2rem",
      fontFamily: "'Georgia', serif",
    },
    step: {
      fontSize: "1.1rem",
      marginBottom: "1.1rem",
    },
    noSteps: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#888",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
    },
    button: {
        backgroundColor: "#ffffff",
        color: "#000000",
       // border: "none",
        border: "1px solid #000",
        borderRadius: "30px",
        padding: "0.8rem 3rem",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Georgia', serif",
       
      },
      imagediv:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Ensure vertical centering if needed
        overflow: "hidden", // Prevent overflow issues
        
      },
    
    image:{
        width: "400px",
        height: "300px",
        objectFit: "contain",
        marginBottom: "1rem",
        border: "1px solid #ddd",
        padding: "5px",
        borderRadius: "25%",
    },
    
      buttonHover:{
        backgroundColor: "#000000",
        color: "#ffffff",
        border: "none",
        borderRadius: "30px",
        padding: "0.8rem 3rem",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Georgia', serif",
      },
  };



    

export default CertainRecipe;

