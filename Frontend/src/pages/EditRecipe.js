import React, { useState, useEffect } from "react";


function EditRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //const [inputs, setInputs] = useState([{ id: 1, value: "" }]); // Initial input section
  const [inputs, setInputs] = useState([]);
  const [id, setId] = useState(null);
  const [userRecipe, setUserRecipe] = useState([]);
  const[steps, setSteps] = useState([])
  const [headerBools, setHeaderBools] = useState([false, false, false])

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

const getSteps = async (title) => {

    const user = {
        _id: title,
      };

    const responsetwo = await fetch(' http://localhost:8001/getSteps', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        credentials: 'include', 
        body: JSON.stringify(user) 
      })

      if (responsetwo.ok) {
        const data2 = await responsetwo.json();
        const fetchedSteps = data2[0].steps;
        setSteps(fetchedSteps);
        setInputs(fetchedSteps.map((step, index) => ({ id: index + 1, value: step })));
      }


}



    
      const getRecipe = async () => {
        const title = getQueryParam('title');
        if (!title) {
          return;
        }
      //  alert(title);
        setId(title);
        getSteps(title);

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
            setTitle(data2[0].title);
            setDescription(data2[0].description);

          }
    
      };
    
      useEffect(() => {
        getRecipe();
       }, [] );





    


  const handleAddInput = () => {
    const newInput = { id: inputs.length + 1, value: "" };
    setInputs([...inputs, newInput]); // Add the new input to the state
  };


  const handleInputChange = (id, newValue) => {
    setInputs(inputs.map(input => 
      input.id === id ? { ...input, value: newValue } : input
    ));
  };

  const handleDeleteInput = (id) => {
    const updatedInputs = inputs.filter(input => input.id !== id);
    // Reassign step numbers (IDs) based on the updated array index
    const reassignedInputs = updatedInputs.map((input, index) => ({
      ...input,
      id: index + 1, // Ensure IDs are sequential
    }));
    setInputs(reassignedInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8001/returnusername', {
        method: 'GET',
        credentials: 'include', // Include session cookies
      });

      if (response.ok) {
        const data = await response.json();
        if (data.username) {
          const steps = inputs.map(input => input.value);

          const recipe = {
            title,
            description,
            username: data.username,
            steps,
            _id: id
          };

          const response = await fetch('http://localhost:8001/editrecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(recipe) // Converts the recipe object into a JSON string
          });




          if (response.ok) {
            alert(title + " Recipe edited successfully!");
            window.location.href=  `/certainrecipe?title=${encodeURIComponent(id)}`


          } else {
            alert("Failed to create recipe.");
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
 <div >   

<header style = {styles.headerdiv}>
<a href = "/yourrecipe" 
onMouseEnter={() => handleMouseEnter(0)}
onMouseLeave={() => handleMouseLeave(0)}
style={headerBools[0] ? styles.linkHover : styles.link}> 
Your Recipes 
</a>

<a href = "/signin" 
onMouseEnter={() => handleMouseEnter(1)}
onMouseLeave={() => handleMouseLeave(1)}
style={headerBools[1] ? styles.linkHover : styles.link}> 
Featured Recipes </a>

<a href = "/signin" 
onMouseEnter={() => handleMouseEnter(2)}
onMouseLeave={() => handleMouseLeave(2)}
style={headerBools[2] ? styles.linkHover : styles.link}>
 Meal Generator </a>

</header>

</div>
<div style={styles.fullpage}>
    <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}> Edit Your Recipe</h1>
      <label htmlFor="title" style={styles.label}>Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        style={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description" style={styles.label}>Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        style={styles.input}
        onChange={(e) => setDescription(e.target.value)}
      />

      {inputs.map(input => (
        <div key={input.id}>
          <label htmlFor={`input-${input.id}`} style={styles.label}>
            Step {input.id}:
          </label>
          <input
            id={`input-${input.id}`}
            type="text"
            style={styles.input}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            required
          />
          <button
            type="button"
            style={styles.Deletebutton}
            onClick={() => handleDeleteInput(input.id) } // Add a delete button
          >
            Delete Step
          </button>
        </div>
      ))}


      <button type="button" onClick={handleAddInput} style={styles.Addbutton}>
        Add Another Step
      </button>

      <button type="submit" style={styles.button}>Edit Recipe</button>
    </form>
    </div>

    </>

  );
}



const styles = {
    fullpage: {
        width: "100%",
        minHeight: "100vh", // Ensures the background covers the entire page content
       // backgroundColor: "#97AFCB",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // Aligns content at the top, allowing it to grow downward
        padding: "2rem 0", // Adds spacing at the top and bottom
      },
    
      header: {
        fontSize: "3rem",
        fontFamily: "'Georgia', serif",
        textAlign: "center",
        color: "#000000",
        marginBottom: "2rem",
        top: 0, // Sticks to the top of the viewport
        zIndex: 10, // Ensures it stays above other content
        padding: "1rem 0",
        width: "100%", // Stretches across the full width of the container
      },
    
      form: {
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        border: "3px solid #000",
        borderRadius: "15px",
        //padding: "2rem",
       // width: "450px",
       padding: "2rem 3.5rem",
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
        fontFamily: "'Georgia', serif",
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


      Deletebutton: {
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "1.5px solid #000",
        borderRadius: "30px",
        padding: "0.4rem 1.7rem",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        margin: "0.6rem",
        fontFamily: "'Georgia', serif",
      },

     Addbutton: {
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "1.9px solid #000",
        borderRadius: "30px",
        padding: "0.7rem 1.75rem",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        margin: "0.6rem",
        fontFamily: "'Georgia', serif",
      },


   


      headerdiv:{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#577493",
        padding: "1rem",
        fontFamily: "'Georgia', serif",
        marginBottom: "1rem",
      },

//
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



      headerWord:{
        padding: "1rem 3.5rem",
        color:"#ffffff",
        fontSize: "1.2rem",
        margin: "0.2rem",
        fontWeight: "bold",
        fontFamily: "'Georgia', serif",
        textDecoration: "none",
      },

      headerafterWord:{
        padding: "1rem 3.5rem",
        color:"#000000",
        fontSize: "1.2rem",
        margin: "0.2rem",
        fontWeight: "bold",
        fontFamily: "'Georgia', serif",
        textDecoration: "none",
      }
      


};

export default EditRecipe;
