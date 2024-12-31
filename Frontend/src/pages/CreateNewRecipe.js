import React, { useState, useRef } from "react";

function CreateNewRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]); // Initial input section
  const [photo, setPhoto] = useState('');
  const profilePhotoRef = useRef();
  const [isRecipeHovering, setIsRecipeHovering] = useState(false);
  const [isFeaturedHovering, setIsFeaturedHovering] = useState(false);
  const [isMealHovering, setIsMealHovering] = useState(false);
  //const [isOn, setIsOn] = useState(false);
  const [isOn, setIsOn] = useState([false, false, false]);

    // const toggleSwitch = () => {
    //   setIsOn((prevState) => !prevState);
    // };

    const toggleSwitch = (id) => {
      setIsOn((prevStates) => {
        const updatedStates = [...prevStates];
        updatedStates[id] = !updatedStates[id]; // Correctly toggling the state at index `id`
        return updatedStates;
      });
    };

  const handleMouseEnterRecipe = () => {
    setIsRecipeHovering(true);
  };

  const handleMouseLeaveRecipe = () => {
    setIsRecipeHovering(false);
  };



  const handleMouseEnterFeatured = () => {
    setIsFeaturedHovering(true);
  };

  const handleMouseLeaveFeatured = () => {
    setIsFeaturedHovering(false);
  };


  const handleMouseEnterMeal = () => {
    setIsMealHovering(true);
  };

  const handleMouseLeaveMeal = () => {
    setIsMealHovering(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Read the file as a binary string to convert to Buffer later
      reader.onload = (event) => {
        const buffer = new Uint8Array(event.target.result); // Convert to Buffer
        setPhoto({
          data: buffer, // Store the buffer in the state
          contentType: file.type, // Store the MIME type
        });
      };

      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
  };

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
  
    // Prepare the form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
  
    if (photo) {
      formData.append('photo', new Blob([photo.data], { type: photo.contentType }), 'photo.jpg');
    }
  
    inputs.forEach((input, index) => {
      formData.append(`steps[${index}]`, input.value);
    });
  
    try {
      // Fetch the username
      const usernameResponse = await fetch('http://localhost:8001/returnusername', {
        method: 'GET',
        credentials: 'include', // Include session cookies
      });
  
      if (!usernameResponse.ok) {
        throw new Error('Failed to retrieve username');
      }
  
      const { username } = await usernameResponse.json();
  
      if (!username) {
        throw new Error('Username not found in response');
      }
  
      formData.append('username', username);
  
      // Submit the recipe
      const recipeResponse = await fetch('http://localhost:8001/addrecipe', {
        method: 'POST',
        body: formData,
      });
  
      if (!recipeResponse.ok) {
        throw new Error('Failed to create recipe');
      }
      setTitle("");
      setDescription("");
      setInputs([{id: 1, value: " "}]);
      setPhoto("");
      profilePhotoRef.current = null;
       window.location.href=  `/createnewrecipe`
      alert('Recipe created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error: ' + error.message);
    }
  };
  
  




  return (
    <>
 <div >   






    
<header style = {styles.headerdiv}>
<a href = "/yourrecipe" 
onMouseEnter={handleMouseEnterRecipe}
onMouseLeave={handleMouseLeaveRecipe}
style={isRecipeHovering ? styles.linkHover : styles.link}> 
Your Recipes 
</a>

<a href = "/signin" 
onMouseEnter={handleMouseEnterFeatured}
onMouseLeave={handleMouseLeaveFeatured}
style={isFeaturedHovering ? styles.linkHover : styles.link}> 
Featured Recipes </a>

<a href = "/mealgenerator" 
onMouseEnter={handleMouseEnterMeal}
onMouseLeave={handleMouseLeaveMeal}
style={isMealHovering ? styles.linkHover : styles.link}>
 Meal Generator </a>

</header>



</div>



<div style={styles.fullpage}>
    <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}> Add a New Recipe</h1>
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

<div style={styles.photoInput}>
<label htmlFor="photo" style={styles.label}>Photo (Optional):</label>
<input
        type="file"
        name="photo"
        accept="image/*"
        //required
        
        ref={profilePhotoRef}
        onChange={handleFileChange}
      />
</div>

<div style={styles.switchContainer}>
  <h style={styles.Switchlabel}>Breakfast</h>
  <div
    style={isOn[0] ? styles.switch : styles.IsOnswitch}
    onClick={() => toggleSwitch(0)}
  >
    <div
      style={isOn[0] ? styles.switchCircle : styles.IsOnswitchCircle}
    ></div>
  </div>
</div>

<div style={styles.switchContainer}>
  <h style={styles.Switchlabel}>Lunch</h>
  <div
    style={isOn[1] ? styles.switch : styles.IsOnswitch}
    onClick={() => toggleSwitch(1)}
  >
    <div
      style={isOn[1] ? styles.switchCircle : styles.IsOnswitchCircle}
    ></div>
  </div>
</div>

<div style={styles.switchContainer}>
  <h style={styles.Switchlabel}>Dinner</h>
  <div
    style={isOn[2] ? styles.switch : styles.IsOnswitch}
    onClick={() => toggleSwitch(2)}
  >
    <div
      style={isOn[2] ? styles.switchCircle : styles.IsOnswitchCircle}
    ></div>
  </div>
</div>







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

      <button type="submit" style={styles.button}>Create New Recipe</button>
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

      photoInput:{
        marginBottom:"3rem",
      },

      // switchContainer: {
      //   // display: "flex",
      //   // alignItems: "left",
      //   // justifyContent: "left",
      //   // marginTop: "1rem",
      
      //   display: 'flex',
      //   flexDirection: 'row', // Align items vertically
      //   alignItems: 'flex-start', // Align switches to the left
      //   gap: '5px', // Add spacing between items
      //   padding: '5px', // Optional padding around the container
      // },
  
      label: {
        fontSize: "1.5rem",
        fontFamily: "'Georgia', serif",
        color: "#000000",
        marginBottom: "1.25rem",
        textAlign: "left",
        width: "100%",
        
      },

      switchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // Vertically centers label and switch
        gap: '5px', // Adds spacing between label and switch
        padding: '5px', // Optional vertical spacing
        width: '100%', // Ensures the container spans full width
        marginBottom: "10px",
    },
    
    Switchlabel: {
        fontSize: "1.5rem",
        fontFamily: "'Georgia', serif",
        color: "#000000",
        marginBottom: "0", // Remove bottom margin
        textAlign: "left", // Align text to the left
        width: "150px", // Set a fixed width for consistent alignment
    },
    


      input: {
        width: "100%",
        padding: "0.8rem",
        fontSize: "1.2rem",
        borderRadius: "15px",
        border: "1px solid #000",
        marginBottom: "2rem",
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
      },


      switch: {
        width: "80px",
        height: "35px",
        backgroundColor: "green" ,
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
      },
  
      IsOnswitch: {
        width: "80px",
        height: "35px",
        backgroundColor: "red",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
      },

      switchCircle: {
        width: "20px",
        height: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        transition: "transform 0.3s ease-in-out",
        transform: "translateX(0)",
      },

      IsOnswitchCircle: {
        width: "20px",
        height: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        transition: "transform 0.3s ease-in-out",
        transform:"translateX(55px)" ,
      },
      


};

export default CreateNewRecipe;
