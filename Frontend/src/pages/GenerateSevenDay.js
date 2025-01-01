import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function GenerateSevenDay() {
const [headerBools, setHeaderBools] = useState([false, false, false]);
const [userRecipes, setUserRecipes] = useState([]);
const [isOn, setIsOn] = useState(false);
const [randArr, setrandArr] = useState([]);
const [breakfastrandArr, setBreakfastrandArr] = useState([]);
const [LunchrandArr, setLunchrandArr] = useState([]);
const [dinnerrandArr, setDinnerrandArr] = useState([]);

const [breakfastRecipe, setBreakfastRecipe] = useState([]);
const [lunchRecipe, setLunchRecipe] = useState([]);
const [dinnerRecipe, setDinnerRecipes] = useState([]);



    const toggleSwitch = () => {
      setIsOn((prevState) => !prevState);
    };


    const handleButtonClick = async () => {

    setIsOn(true);

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



            // const responsetwo = await fetch(' http://localhost:8001/getBreakfastRecipes', {
            //     method: 'POST', 
            //     headers: { 'Content-Type': 'application/json' }, 
            //     credentials: 'include', 
            //     body: JSON.stringify(user) 
            //   })

            // if (responsetwo.ok) {

            //   const data2 = await responsetwo.json();
            //   setUserRecipes(data2);
            //   setRandArr(data2.length);
            
            // }

            const breakfastresponse = await fetch(' http://localhost:8001/getBreakfastRecipes', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include', 
                body: JSON.stringify(user) 
              })

            if (breakfastresponse.ok) {

              const breakfast = await breakfastresponse.json();
              setBreakfastRecipe(breakfast);
              setBreakfastrandArr(breakfast.length);

              const lunchReponse = await fetch(' http://localhost:8001/getLunchRecipes', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include', 
                body: JSON.stringify(user) 
              })

              if(lunchReponse.ok){
                const lunch = await lunchReponse.json();
                setLunchRecipe(lunch);
                setLunchrandArr(lunch.length);

                const dinnerReponse = await fetch(' http://localhost:8001/getDinnerRecipes', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    credentials: 'include', 
                    body: JSON.stringify(user) 
                  })
                  if(dinnerReponse.ok){
                    const dinner = await dinnerReponse.json();
                    setDinnerRecipes(dinner);
                    setDinnerrandArr(dinner.length);
                  }

              }
            
            }

          }
        }
      } 
      
        catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
      }

    };

    const handleButtonClickRand = () => {
        setRandArr(userRecipes.length);
    };

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }

      

      const setRandArr = (max) => {
        const newRandArr = []; // Local array to store unique random numbers

        while (newRandArr.length < 7) {
          const randomNumber = getRandomNumber(0, max);
      
          if (!newRandArr.includes(randomNumber)) {
            newRandArr.push(randomNumber);
          }
        }
      
        setrandArr(newRandArr); // Update the state once after the loop
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

<h style = {styles.header}>Generate a Meal Plan for Seven Days </h>

{!isOn && (
    <div style={styles.buttonForm}>
  <button
    style={styles.Deletebutton}
    onClick={handleButtonClick}
  >
    Generate Meal
  </button>
  </div>
)}


{isOn && userRecipes.length > 0 && (

<div style={styles.fullform}>

 <Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[0]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(3)}
 onMouseLeave={() => handleMouseLeave(3)}
 style={headerBools[3] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day One </u></h>
   <h2 >{userRecipes[randArr[0]].title}</h2>
   <p >{userRecipes[randArr[0]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[0]].date.slice(0, 10)}</p>
  
 </div>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[1]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(4)}
 onMouseLeave={() => handleMouseLeave(4)}
 style={headerBools[4] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day Two </u></h>
   <h2 >{userRecipes[randArr[1]].title}</h2>
   <p >{userRecipes[randArr[1]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[1]].date.slice(0, 10)}</p>
  
 </div>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[2]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(5)}
 onMouseLeave={() => handleMouseLeave(5)}
 style={headerBools[5] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day Three </u></h>
   <h2 >{userRecipes[randArr[2]].title}</h2>
   <p >{userRecipes[randArr[2]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[2]].date.slice(0, 10)}</p>
  
 </div>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[3]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day Four </u></h>
   <h2 >{userRecipes[randArr[3]].title}</h2>
   <p >{userRecipes[randArr[3]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[3]].date.slice(0, 10)}</p>
  
 </div>
</Link>





<Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[4]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(7)}
 onMouseLeave={() => handleMouseLeave(7)}
 style={headerBools[7] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day Five </u></h>
   <h2 >{userRecipes[randArr[4]].title}</h2>
   <p >{userRecipes[randArr[4]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[4]].date.slice(0, 10)}</p>
  
 </div>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[5]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(8)}
 onMouseLeave={() => handleMouseLeave(8)}
 style={headerBools[8] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day Six </u></h>
   <h2 >{userRecipes[randArr[5]].title}</h2>
   <p >{userRecipes[randArr[5]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[5]].date.slice(0, 10)}</p>
  
 </div>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(userRecipes[randArr[6]]._id)}` } style={styles.linkp}>
 <div  
 onMouseEnter={() => handleMouseEnter(9)}
 onMouseLeave={() => handleMouseLeave(9)}
 style={headerBools[9] ? styles.formtwo : styles.form }
 >
<h style = {styles.dayHeader}><u>Day Seven </u></h>
   <h2 >{userRecipes[randArr[6]].title}</h2>
   <p >{userRecipes[randArr[6]].description}</p>
   <p > <b>Date Posted:</b> {userRecipes[randArr[6]].date.slice(0, 10)}</p>
  
 </div>
</Link>


</div>

)}

{isOn && userRecipes.length > 0 && (
<button
    style={styles.Deletebutton}
    onClick={handleButtonClickRand}
 //  onClick ={setRandArr(userRecipes.length)}
  >
Regenerate Meal Plan
  </button>

)}

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
      dayHeader:{
        fontSize: "1.6rem",
        fontFamily: "'Georgia', serif",
      },

      switchContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1rem",
      },
  
      switch: {
        width: "60px",
        height: "30px",
        backgroundColor: "green" ,
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
      },
  
      IsOnswitch: {
        width: "60px",
        height: "30px",
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
        transform:"translateX(30px)" ,
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

      buttonForm:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

      linkp:{
        textDecoration: "none",
          color: 'inherit',
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


};


export default GenerateSevenDay



{/* <div>
<h> </h>
<div style={styles.switchContainer}>
        <div style={isOn ? styles.switch : styles.IsOnswitch} onClick={toggleSwitch}>
          <div style={isOn ? styles.switchCircle : styles.IsOnswitchCircle }></div>
        </div>
</div>

</div> */}