import React, { useState, useEffect } from "react";

function YourRecipePage() {
  const [userRecipes, setUserRecipes] = useState([]);

  
  const [isRecipeHovering, setIsRecipeHovering] = useState(false);
  const [isFeaturedHovering, setIsFeaturedHovering] = useState(false);
  const [isMealHovering, setIsMealHovering] = useState(false);

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
            //alert (data.username);

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
<a href = "/signin" 
onMouseEnter={handleMouseEnterRecipe}
onMouseLeave={handleMouseLeaveRecipe}
style={isRecipeHovering ? styles.headerafterWord : styles.headerWord}> 
Your Recipes 
</a>

<a href = "/signin" 
onMouseEnter={handleMouseEnterFeatured}
onMouseLeave={handleMouseLeaveFeatured}
style={isFeaturedHovering ? styles.headerafterWord : styles.headerWord}> 
Featured Recipes </a>

<a href = "/signin" 
onMouseEnter={handleMouseEnterMeal}
onMouseLeave={handleMouseLeaveMeal}
style={isMealHovering ? styles.headerafterWord : styles.headerWord}>
 Meal Generator </a>

</header>
</div>

{userRecipes.length === 0 ? (
      <p>No recipes found.</p>
    ) : (
      userRecipes.map((listing) => (
        <div key={listing.id}>
          <h2 >{listing.title}</h2>
          <p>{listing.date}</p>
          <p>{listing.description}</p>
        </div>
      ))
    )}


  </>

  );
}


const styles = {
    fullpage: {
        width: "100%",
        minHeight: "100vh", // Ensures the background covers the entire page content
        backgroundColor: "#97AFCB",
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
        padding: "2rem",
        width: "450px",
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
        margin: "0.6rem"
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
        backgroundColor: "#577493",
        padding: "1rem 1.5rem",
        border: "1px solid #000",
        borderRadius: "2px",
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

export default YourRecipePage;


//const [userListings, setUserListings] = useState([]);



// useEffect(() => {
//   const fetchUserData = async () => {
//     const username = getQueryParam("title");
//     if (!username) {
//       setError("Error: Not Logged in");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:8001/fetch-user-attributes?title=${encodeURIComponent(
//           username
//         )}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch user attributes");
//       }
//       const data = await response.json();
//       setUserData(data);

//       const responseTwo = await fetch(
//         `http://localhost:8001/getUser-listings?user=${encodeURIComponent(username)}`
//       );
//       if (!responseTwo.ok) {
//         throw new Error("Failed to fetch listings");
//       }

//       const data2 = await responseTwo.json();
//       setUserListings(data2);
//     } catch (error) {
//       console.error("Error fetching user attributes or listings:", error);
//       setError("Error loading user data");
//     }
//   };

//   fetchUserData();
// }, []); 


{/* <ListingsContainer>
{userListings.map((listing) => (
<ListingCard key={listing.id}>
{listing.photo && (
  <Link to={`/customimage?title=${encodeURIComponent(listing.title)}`}>
  <ListingImage src={listing.photo} alt={listing.title} />
  </Link>
)}
    <h2 className="listing-title">{listing.title}</h2>
    <p className="listing-price">${listing.price}</p>
    <p className="listing-description">{listing.description}</p>
</ListingCard>
))}
</ListingsContainer> */}