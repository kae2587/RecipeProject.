import React, { useState, useEffect, useRef } from "react";


function MealGenerator() {

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



    return(

<>

<header style = {styles.headerdiv}>
<a href = "/yourrecipe" 
onMouseEnter={() => handleMouseEnter(0)}
onMouseLeave={() => handleMouseLeave(0)}
style={headerBools[0] ? styles.linkHover : styles.link}
> 
Your Recipes 
</a>

<a href = "/signin" 
onMouseEnter={() => handleMouseEnter(1)}
onMouseLeave={() => handleMouseLeave(1)}
style={headerBools[1] ? styles.linkHover : styles.link}
> 
Featured Recipes </a>

<a href = "/mealgenerator" 
onMouseEnter={() => handleMouseEnter(2)}
onMouseLeave={() => handleMouseLeave(2)}
style={headerBools[2] ? styles.linkHover : styles.link}
>
 Meal Generator </a>

</header>

<h style = {styles.header}>Meal Generator </h>


<div style = {styles.formDiv} >

<div

onMouseEnter={() => handleMouseEnter(3)}
onMouseLeave={() => handleMouseLeave(3)}
style={headerBools[3] ? styles.formtwo : styles.form}

>
    
<a href="/generatesevenday" style={headerBools[3] ? styles.formTexttwo : styles.formText}>
Generate a seven day plan</a>
</div>

<div 
onMouseEnter={() => handleMouseEnter(4)}
onMouseLeave={() => handleMouseLeave(4)}
style={headerBools[4] ? styles.formtwo : styles.form}

>
<a href="#" style={headerBools[4] ? styles.formTexttwo : styles.formText}>Generate a one day plan</a>
</div>


<div 
onMouseEnter={() => handleMouseEnter(5)}
onMouseLeave={() => handleMouseLeave(5)}
style={headerBools[5] ? styles.formtwo : styles.form}

>
<a href="#" style={headerBools[5] ? styles.formTexttwo : styles.formText}> Generate one meal</a>
</div>
</div>




</>

    );

}




const styles = {
    headerdiv:{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#577493",
        padding: "1rem",
        fontFamily: "'Georgia', serif",
        marginBottom: "3rem",
      },

      formDiv: {
        display: "flex",
        flexDirection: "row", // Keep children in a row
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Center items vertically
        textAlign: "center", // Ensure the text inside is centered
       // minHeight: "100vh", // Make the div take full viewport height
        gap: "1rem", // Add spacing between items
    },
    form: {
        display: "flex",
        flexDirection: "column", // Adjust text and content to stack
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        backgroundColor: "#f4f4f4",
        fontFamily: "'Georgia', serif",
        border: "3px solid #000",
        borderRadius: "15px",
        padding: "2rem 1rem",
        width: "300px", // Adjust width for better scaling
        margin: "1rem",
        textAlign: "center",
        boxSizing: "border-box", // Prevents overflow issues
        fontSize: "1.2rem",
    },

    formtwo: {

        display: "flex",
        flexDirection: "column", // Adjust text and content to stack
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        backgroundColor: "#000000",
        fontFamily: "'Georgia', serif",
        border: "3px solid #97AFCB",
        borderRadius: "15px",
        padding: "2rem 1rem",
        width: "300px", // Adjust width for better scaling
        margin: "1rem",
        textAlign: "center",
        color: "#ffffff",
        boxSizing: "border-box", // Prevents overflow issues
        fontSize: "1.2rem",
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


        header: {
            fontSize: "3rem",
            fontFamily: "'Georgia', serif",
            textAlign: "center",
            color: "#000000",
           // marginBottom: "2rem",
            marginTop: "2rem",
            marginBottom: "2.5rem",
            position: "relative", // Ensure proper positioning
            top: 0,
            zIndex: 10,
            padding: "1rem",
            width: "100%",
            display: "flex", // Enables Flexbox
            alignItems: "center", // Centers content vertically
            justifyContent: "center", // Centers content horizontally
            fontWeight: "bold"
          },
        



          formText:{
            display: "flex",
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#000000",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            fontFamily: "'Georgia', serif",
          },
    
          formTexttwo:{
            display: "flex",
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            fontFamily: "'Georgia', serif",
          },




};


export default MealGenerator;