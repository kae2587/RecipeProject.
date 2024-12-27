import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function YourRecipePage() {
  const [userRecipes, setUserRecipes] = useState([]);
  const [search, setSearch] = useState("");
  
  const [isRecipeHovering, setIsRecipeHovering] = useState(false);
  const [isFeaturedHovering, setIsFeaturedHovering] = useState(false);
  const [isMealHovering, setIsMealHovering] = useState(false);

  const [hoverStates, setHoverStates] = useState([]);
  


  useEffect(() => {

    const handleSearch = async () => {
      try {
        const response = await fetch('http://localhost:8001/returnusername', {
          method: 'GET',
          credentials: 'include', // Include session cookies
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            

            const user = {
              username: data.username,
              title: search,
            };


            if (search === ""){

             
            const user = {
              username: data.username,
            };



            const responsetwo = await fetch(' http://localhost:8001/getRecipes', {
              method: 'POST', 
              headers: { 'Content-Type': 'application/json' }, 
              credentials: 'include', 
              body: JSON.stringify(user) 
            })

            if (responsetwo.ok) {

              const data2 = await responsetwo.json();
              setUserRecipes(data2);

            
            }
              
            }

            else {
            const responsetwo = await fetch(' http://localhost:8001/getSearchRecipes', {
              method: 'POST', 
              headers: { 'Content-Type': 'application/json' }, 
              credentials: 'include', 
              body: JSON.stringify(user) 
            })

            if (responsetwo.ok) {

              const data2 = await responsetwo.json();
              setUserRecipes(data2);

            
            }
          }

          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
      }

    };
  
    handleSearch();
  }, [search]); 


  const handleMouseEnter = (id) => {
    setHoverStates((prevStates) => ({ ...prevStates, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHoverStates((prevStates) => ({ ...prevStates, [id]: false }));
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

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8001/returnusername', {
          method: 'GET',
          credentials: 'include', // Include session cookies
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            

            const user = {
              username: data.username,
            };



            const responsetwo = await fetch(' http://localhost:8001/getRecipes', {
              method: 'POST', 
              headers: { 'Content-Type': 'application/json' }, 
              credentials: 'include', 
              body: JSON.stringify(user) 
            })

            if (responsetwo.ok) {

              const data2 = await responsetwo.json();
              setUserRecipes(data2);

            
            }

          

          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
      }

    };
  
    fetchRecipes();
  }, []); 


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

<a href = "/signin" 
onMouseEnter={handleMouseEnterMeal}
onMouseLeave={handleMouseLeaveMeal}
style={isMealHovering ? styles.linkHover : styles.link}>
 Meal Generator </a>

</header>
</div>
<h style={styles.header}>My Recipes</h>

<form style={styles.searchForm}>
<label htmlFor="search" style={styles.searchLabel}> Search for a recipe</label>
      <input
        type="text"
        id="search"
        value={search}
        placeholder="Enter the recipe title"
        style={styles.searchInput}
        onChange={(e) => setSearch(e.target.value)}
      />
</form>


<div style={styles.fullform}>
{userRecipes.length === 0 ? (
      <p>No recipes found.</p>
    ) : (
      userRecipes.map((listing) => (


<Link to={`/certainrecipe?title=${encodeURIComponent(listing._id)}` } style={styles.linkp}>
        <div key={listing.id} 
        onMouseEnter={() => handleMouseEnter(listing.id)}
        onMouseLeave={() => handleMouseLeave(listing.id)}
        style={hoverStates[listing.id] ? styles.formtwo : styles.form }
        >
   
          <h2 >{listing.title}</h2>
          <p >{listing.description}</p>
          <p > <b>Date Posted:</b> {listing.date.slice(0, 10)}</p>
         
        </div>
</Link>

      ))
    )}

</div>

<a href = "/createnewrecipe" style={styles.linkfor} > + Add a New Recipe</a>

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
       // marginBottom: "2rem",
        marginTop: "2rem",
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

      linkp:{
        textDecoration: "none",
          color: 'inherit',
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
      
    
      form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       backgroundColor: "#f4f4f4",
        fontFamily: "'Georgia', serif",
        border: "3px solid #000",
        borderRadius: "15px",
        padding: "2rem 1rem",
        width: "450px",
        boxSizing: "border-box",
         margin: "1rem",
         textAlign: "center",
         textDecoration: "none",
      },

      formtwo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#000000",
        fontFamily: "'Georgia', serif",
        border: "3px solid #97AFCB", // This sets the border to white
        borderRadius: "15px",
        padding: "2rem 1rem",
        width: "450px",
        boxSizing: "border-box",
        margin: "1rem",
        textAlign: "center",
        textDecoration: "none",
        color: "#ffffff"
      },

      fullform: {
        width: "100vw", // Use full viewport width
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "1rem 1.5rem",
        boxSizing: "border-box", // Ensure border/padding doesn’t reduce width
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
        margin: "0.6rem"
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
        margin: "0.6rem"
      },


      headerdiv:{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#577493",
        padding: "1rem",
        fontFamily: "'Georgia', serif",
      },

      linkfor:{
        padding: "3rem 3.5rem",
        color:"#000000",
        fontSize: "1.2rem",
        margin: "0.5rem",
        fontWeight: "bold",
        fontFamily: "'Georgia', serif",
        textDecoration: "none",
        
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


      searchForm:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },


      searchLabel:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        textAlign: "center",
        padding: "1.5rem",
        fontSize: "1.5rem",
      },
      searchInput:{
         display: "flex",
         flexDirection: "column",
        width: "45%",
        fontSize: "1.2rem",
        borderRadius: "15px",
        border: "1px solid #000",
        marginBottom: "1rem",
        boxSizing: "border-box",
        padding: ".5rem",
        
      },

};

export default YourRecipePage;



