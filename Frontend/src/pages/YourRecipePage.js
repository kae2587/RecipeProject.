import React, { useState } from "react";


function YourRecipePage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
   // const [username, setUsername] = useState('');
    const [inputs, setInputs] = useState([{ id: 1, value: "" }]); // Initial input section
    //const [steps, setSteps] = useState([""]);

    // Function to handle adding a new input
    const handleAddInput = () => {
      const newInput = { id: inputs.length + 1, value: "" };
      setInputs([...inputs, newInput]); // Add the new input to the state
    };
  
    // Function to handle input changes
    const handleInputChange = (id, newValue) => {
      setInputs(inputs.map(input => 
        input.id === id ? { ...input, value: newValue } : input
      ));
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
              
             // setUsername(data.username);
             const steps = inputs.map(input => input.value);

              const recipe = {
                title,
                description,
                username: data.username,
                //steps: inputs
                steps
              };
          
          
              const response = await fetch(' http://localhost:8001/addrecipe', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include', 
                body: JSON.stringify(recipe) // converts the user object into a json string so that it can be sent to the request body because it is currently a javascript object.
              })

              if (response.ok){
                alert ("worked");
                // const data = await response.json();
                // if (data.message){
                //     alert ("Worked")
                // }
            }
            else {
                alert("No");
            }

            } 
          } 

        } catch (error) {
          console.error('Error fetching data:', error);
          alert('An error occurred. Please try again.');
        }
      };

return(
    <form onSubmit={handleSubmit} >
        <label htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">
        Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        
      {inputs.map(input => (
        <div key={input.id}>
          <label htmlFor={`input-${input.id}`}>
            Step {input.id}:
          </label>
          <input
            id={`input-${input.id}`}
            type="text"
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddInput}>
        Add Another Step
      </button>




          <button
          type="submit"
          >
          Create New Recipe
        </button>




    </form>

);

};


export default YourRecipePage;


