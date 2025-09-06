import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function GenerateSevenDay() {
const [headerBools, setHeaderBools] = useState([false, false, false]);
const [userRecipes, setUserRecipes] = useState([]);
const [isOn, setIsOn] = useState(false);
const [randArr, setrandArr] = useState([]);
const [type, setType]=useState("");
const [mealtype, setMealType]=useState("")

//random numbers
const [breakfastrandArr, setBreakfastrandArr] = useState([]);
const [LunchrandArr, setLunchrandArr] = useState([]);
const [dinnerrandArr, setDinnerrandArr] = useState([]);




//array of objects
const [breakfastRecipe, setBreakfastRecipe] = useState([]);
const [lunchRecipe, setLunchRecipe] = useState([]);
const [dinnerRecipe, setDinnerRecipes] = useState([]);


    const toggleSwitch = () => {
      setIsOn((prevState) => !prevState);
    };



    const getQueryParam = (param) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
    };
  
const setTypeFunc = (_ => {

    const title = getQueryParam('title');
    if (title) {
        setType(title);
    }
})

useEffect(() => {
    setTypeFunc();
   }, [] );


    const handleButtonClick = async () => {

    setIsOn(true);
    

    try {
        // const response = await fetch('http://localhost:8001/returnusername', {
          const response = await fetch('https://recipeproject-2.onrender.com/returnusername', {
          method: 'GET',
          credentials: 'include', // Include session cookies
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            

            const user = {
               username: data.username,
            };

            // const breakfastresponse = await fetch(' http://localhost:8001/getBreakfastRecipes', {
              const breakfastresponse = await fetch(' https://recipeproject-2.onrender.com/getBreakfastRecipes', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include', 
                body: JSON.stringify(user) 
              })

            if (breakfastresponse.ok) {

              const breakfast = await breakfastresponse.json();
                    if(breakfast.length > 0){
                        setBreakfastRecipe(breakfast);
                        setBreakfastRandArrFunc(breakfast.length);
                    }


             // const lunchReponse = await fetch(' http://localhost:8001/getLunchRecipes', {
               const lunchReponse = await fetch(' https://recipeproject-2.onrender.com/getLunchRecipes', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                credentials: 'include', 
                body: JSON.stringify(user) 
              })

              if(lunchReponse.ok){
                const lunch = await lunchReponse.json();

                if (lunch.length > 0){
                setLunchRecipe(lunch);
                setLunchRandArrFunc(lunch.length);
                }

              //  const dinnerReponse = await fetch(' http://localhost:8001/getDinnerRecipes', {
                const dinnerReponse = await fetch('https://recipeproject-2.onrender.com/getDinnerRecipes', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    credentials: 'include', 
                    body: JSON.stringify(user) 
                  })
                  if(dinnerReponse.ok){
                    const dinner = await dinnerReponse.json();

                    if (dinner.length > 0){
                    setDinnerRecipes(dinner);
                    setDinnerRandArrFunc(dinner.length);
                    }



                  }

              }
            
            }



          }
        }

        else {

            alert ("Not Signed in. Please Sign in Again")
            window.location.href = "/signin";
  
          }




      } 
      
        catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
      }

    };





    const handleButtonClickRand = () => {
        setBreakfastRandArrFunc(breakfastRecipe.length);
        setLunchRandArrFunc(lunchRecipe.length);
        setDinnerRandArrFunc(dinnerRecipe.length);
    };

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }

      


      const setBreakfastRandArrFunc = (max) => {

        const newRandArr = []; // Local array to store unique random numbers
        if (max > 7){

            while (newRandArr.length < 7) {
            const randomNumber = getRandomNumber(0, max);
        
            if (!newRandArr.includes(randomNumber)) {
                newRandArr.push(randomNumber);
            }
            }

        }
        else {


            while (newRandArr.length < 7) {
                const randomNumber = getRandomNumber(0, max);
            
                newRandArr.push(randomNumber);

                }


        }



        setBreakfastrandArr(newRandArr); // Update the state once after the loop
      };


      const setLunchRandArrFunc = (max) => {
     
        const newRandArr = []; // Local array to store unique random numbers
        if (max > 7){

            while (newRandArr.length < 7) {
            const randomNumber = getRandomNumber(0, max);
        
            if (!newRandArr.includes(randomNumber)) {
                newRandArr.push(randomNumber);
            }
            }

        }
        else {


            while (newRandArr.length < 7) {
                const randomNumber = getRandomNumber(0, max);
            
                newRandArr.push(randomNumber);

                }


        }
        
        setLunchrandArr(newRandArr); // Update the state once after the loop
      };


      const setDinnerRandArrFunc = (max) => {
        
        const newRandArr = []; // Local array to store unique random numbers
        if (max > 7){

            while (newRandArr.length < 7) {
            const randomNumber = getRandomNumber(0, max);
        
            if (!newRandArr.includes(randomNumber)) {
                newRandArr.push(randomNumber);
            }
            }

        }
        else {


            while (newRandArr.length < 7) {
                const randomNumber = getRandomNumber(0, max);
            
                newRandArr.push(randomNumber);

                }


        }

        setDinnerrandArr(newRandArr); // Update the state once after the loop
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



<a href = "/mealgenerator" 
onMouseEnter={() => handleMouseEnter(2)}
onMouseLeave={() => handleMouseLeave(2)}
style={headerBools[2] ? styles.linkHover : styles.link}
>
 Meal Generator </a>

</header>

{!isOn && type == "SevenDay" && (

<h style = {styles.header}>Generate a Meal Plan for Seven Days </h>

)}

{!isOn && type == "SevenDay" && (
    <div style={styles.buttonForm}>
        
  <button


onMouseEnter={() => handleMouseEnter(26)}
onMouseLeave={() => handleMouseLeave(26)}
style={headerBools[26] ? styles.DeletebuttonAfter : styles.Deletebutton }

    onClick={handleButtonClick}
  >
    Generate Meals
  </button>
  </div>
)}


{isOn && breakfastRecipe.length > 0 && lunchRecipe.length > 0  && dinnerRecipe.length > 0  && type == "SevenDay" && (

<div>
<h style = {styles.header}>Seven Day Plan </h>

<div style={styles.fullform}>

   
<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day One </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[0]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(3)}
 onMouseLeave={() => handleMouseLeave(3)}
 style={headerBools[3] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(3)}
 onMouseLeave={() => handleMouseLeave(3)}
 style={headerBools[3] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[0]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[0]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(4)}
 onMouseLeave={() => handleMouseLeave(4)}
 style={headerBools[4] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(4)}
 onMouseLeave={() => handleMouseLeave(4)}
 style={headerBools[4] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[0]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[0]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(5)}
 onMouseLeave={() => handleMouseLeave(5)}
 style={headerBools[5] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(5)}
 onMouseLeave={() => handleMouseLeave(5)}
 style={headerBools[5] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[0]].title}</p>
</Link>

</div>



<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Two </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[1]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[1]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[1]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(7)}
 onMouseLeave={() => handleMouseLeave(7)}
 style={headerBools[7] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(7)}
 onMouseLeave={() => handleMouseLeave(7)}
 style={headerBools[7] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[1]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[1]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(8)}
 onMouseLeave={() => handleMouseLeave(8)}
 style={headerBools[8] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(8)}
 onMouseLeave={() => handleMouseLeave(8)}
 style={headerBools[8] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[1]].title}</p>
</Link>
</div>






<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Three </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[2]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(9)}
 onMouseLeave={() => handleMouseLeave(9)}
 style={headerBools[9] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(9)}
 onMouseLeave={() => handleMouseLeave(9)}
 style={headerBools[9] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[2]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[2]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(10)}
 onMouseLeave={() => handleMouseLeave(10)}
 style={headerBools[10] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(10)}
 onMouseLeave={() => handleMouseLeave(10)}
 style={headerBools[10] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[2]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[2]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(11)}
 onMouseLeave={() => handleMouseLeave(11)}
 style={headerBools[11] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(11)}
 onMouseLeave={() => handleMouseLeave(11)}
 style={headerBools[11] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[2]].title}</p>
</Link>

</div>




<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Four </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[3]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(12)}
 onMouseLeave={() => handleMouseLeave(12)}
 style={headerBools[12] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(12)}
 onMouseLeave={() => handleMouseLeave(12)}
 style={headerBools[12] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[3]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[3]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(13)}
 onMouseLeave={() => handleMouseLeave(13)}
 style={headerBools[13] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(13)}
 onMouseLeave={() => handleMouseLeave(13)}
 style={headerBools[13] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[3]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[3]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(14)}
 onMouseLeave={() => handleMouseLeave(14)}
 style={headerBools[14] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(14)}
 onMouseLeave={() => handleMouseLeave(14)}
 style={headerBools[14] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[3]].title}</p>
</Link>

</div>


<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Five </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[4]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(15)}
 onMouseLeave={() => handleMouseLeave(15)}
 style={headerBools[15] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(15)}
 onMouseLeave={() => handleMouseLeave(15)}
 style={headerBools[15] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[4]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[4]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(16)}
 onMouseLeave={() => handleMouseLeave(16)}
 style={headerBools[16] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(16)}
 onMouseLeave={() => handleMouseLeave(16)}
 style={headerBools[16] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[4]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[4]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(17)}
 onMouseLeave={() => handleMouseLeave(17)}
 style={headerBools[17] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(17)}
 onMouseLeave={() => handleMouseLeave(17)}
 style={headerBools[17] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[4]].title}</p>
</Link>

</div>




<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Six </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[5]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(18)}
 onMouseLeave={() => handleMouseLeave(18)}
 style={headerBools[18] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(18)}
 onMouseLeave={() => handleMouseLeave(18)}
 style={headerBools[18] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[5]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[5]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(19)}
 onMouseLeave={() => handleMouseLeave(19)}
 style={headerBools[19] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(19)}
 onMouseLeave={() => handleMouseLeave(19)}
 style={headerBools[19] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[5]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[5]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(20)}
 onMouseLeave={() => handleMouseLeave(20)}
 style={headerBools[20] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(20)}
 onMouseLeave={() => handleMouseLeave(20)}
 style={headerBools[20] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[5]].title}</p>
</Link>

</div>




<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Seven </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[6]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(21)}
 onMouseLeave={() => handleMouseLeave(21)}
 style={headerBools[21] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(21)}
 onMouseLeave={() => handleMouseLeave(21)}
 style={headerBools[21] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[6]].title}</p>
</Link>



<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[6]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(22)}
 onMouseLeave={() => handleMouseLeave(22)}
 style={headerBools[22] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(22)}
 onMouseLeave={() => handleMouseLeave(22)}
 style={headerBools[22] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[6]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[6]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(23)}
 onMouseLeave={() => handleMouseLeave(23)}
 style={headerBools[23] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(23)}
 onMouseLeave={() => handleMouseLeave(23)}
 style={headerBools[23] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[6]].title}</p>
</Link>

</div>

</div>
</div>

)}

{isOn && breakfastRecipe.length > 0  && lunchRecipe.length > 0 && dinnerRecipe.length > 0   && type == "SevenDay" &&(
    <div style={styles.buttonForm}>
    <button
    
    onMouseEnter={() => handleMouseEnter(25)}
     onMouseLeave={() => handleMouseLeave(25)}
     style={headerBools[25] ? styles.DeletebuttonAfter : styles.Deletebutton }
    
        onClick={handleButtonClickRand}
      >
    
    Regenerate Meal Plan
      </button>
    </div>
)}






{!isOn && type == "OneDay" && (

<h style = {styles.header}>Generate a Meal Plan for One Day </h>

)}

{!isOn && type == "OneDay" && (
    <div style={styles.buttonForm}>
        
  <button
      onMouseEnter={() => handleMouseEnter(7)}
      onMouseLeave={() => handleMouseLeave(7)}
      style={headerBools[7] ? styles.DeletebuttonAfter : styles.Deletebutton }


    onClick={handleButtonClick}
  >
    Generate Meals
  </button>
  </div>
)}


{isOn && breakfastRecipe.length > 0 && lunchRecipe.length > 0  && dinnerRecipe.length > 0  && type == "OneDay" && (

<div>
<h style = {styles.header}>One Day Plan </h>

<div style={styles.fullformOneDay}>

   
<div 
style={styles.form}
 >

<h style={styles.dayHeader}><u>Day Plan </u></h>
<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[0]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(3)}
 onMouseLeave={() => handleMouseLeave(3)}
 style={headerBools[3] ? styles.MealHeaderTwo : styles.MealHeader }

>
    Breakfast</h2>

<p  
onMouseEnter={() => handleMouseEnter(3)}
 onMouseLeave={() => handleMouseLeave(3)}
 style={headerBools[3] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[0]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[0]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(4)}
 onMouseLeave={() => handleMouseLeave(4)}
 style={headerBools[4] ? styles.MealHeaderTwo : styles.MealHeader }

> Lunch</h2>

<p  
onMouseEnter={() => handleMouseEnter(4)}
 onMouseLeave={() => handleMouseLeave(4)}
 style={headerBools[4] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[0]].title}</p>
</Link>


<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[0]]._id)}` } style={styles.linkp}>
<h2 
 onMouseEnter={() => handleMouseEnter(5)}
 onMouseLeave={() => handleMouseLeave(5)}
 style={headerBools[5] ? styles.MealHeaderTwo : styles.MealHeader }

> Dinner</h2>

<p  
onMouseEnter={() => handleMouseEnter(5)}
 onMouseLeave={() => handleMouseLeave(5)}
 style={headerBools[5] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[0]].title}</p>
</Link>


</div>
</div>
</div>

)}



{isOn && breakfastRecipe.length > 0  && lunchRecipe.length > 0 && dinnerRecipe.length > 0   && type == "OneDay" &&(
    <div style={styles.buttonForm}>
<button

onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.DeletebuttonAfter : styles.Deletebutton }

    onClick={handleButtonClickRand}
  >

Regenerate Meal Plan
  </button>
</div>
)}






{!isOn && type == "OneMeal" && mealtype == "" && (

<h style = {styles.header}>Generate a Meal </h>

)}

{!isOn && type == "OneMeal" && mealtype == "" && (
    <div style={styles.buttonForm}>
        
  <button
       onMouseEnter={() => handleMouseEnter(3)}
       onMouseLeave={() => handleMouseLeave(3)}
       style={headerBools[3] ? styles.DeletebuttonAfter : styles.Deletebutton }

       onClick={() => {
        setMealType("Breakfast"); 
        handleButtonClick(); 
      }}
  >
    Generate Breakfast Meal
  </button>

  <button
       onMouseEnter={() => handleMouseEnter(4)}
       onMouseLeave={() => handleMouseLeave(4)}
       style={headerBools[4] ? styles.DeletebuttonAfter : styles.Deletebutton }
       onClick={() => {
        setMealType("Lunch"); // Set the meal type
        handleButtonClick(); // Call additional function
      }}
  >
    Generate Lunch Meal
  </button>

  <button
        onMouseEnter={() => handleMouseEnter(5)}
        onMouseLeave={() => handleMouseLeave(5)}
        style={headerBools[5] ? styles.DeletebuttonAfter : styles.Deletebutton }
        onClick={() => {
            setMealType("Dinner"); // Set the meal type
            handleButtonClick(); // Call additional function
          }}
  >
    Generate Dinner Meal
  </button>

  </div>
)}




{isOn && type == "OneMeal"  && mealtype == "Breakfast" && breakfastRecipe.length > 0 && (

<div>
<h style = {styles.header}>Breakfast  </h>
<div style={styles.fullformOneDay}>

   
<div 
style={styles.form}
 >

<Link to={`/certainrecipe?title=${encodeURIComponent(breakfastRecipe[breakfastrandArr[0]]._id)}` } style={styles.linkp}>


<p  
onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.MealParaTwo : styles.MealPara }

 
 >{breakfastRecipe[breakfastrandArr[0]].title}</p>


 <p
 onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.mealpara : styles.para }
 
 > <b>Description:</b> {breakfastRecipe[breakfastrandArr[0]].description}</p>
</Link>

</div>
</div>
</div> 


)}


{isOn && type == "OneMeal"  && mealtype == "Lunch" && lunchRecipe.length > 0 && (

<div>
<h style = {styles.header}>Lunch  </h>
<div style={styles.fullformOneDay}>

   
<div 
style={styles.form}
 >

<Link to={`/certainrecipe?title=${encodeURIComponent(lunchRecipe[LunchrandArr[0]]._id)}` } style={styles.linkp}>

<p  
onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.MealParaTwo : styles.MealPara }

 
 >{lunchRecipe[LunchrandArr[0]].title}</p>


<p
 onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.mealpara : styles.para }
 
 > <b>Description:</b> {lunchRecipe[LunchrandArr[0]].description}</p>




</Link>

</div>
</div>
</div> 


)}


{isOn && type == "OneMeal"  && mealtype == "Dinner" && dinnerRecipe.length > 0 && (

<div>
<h style = {styles.header}>Dinner  </h>
<div style={styles.fullformOneDay}>

   
<div 
style={styles.form}
 >

<Link to={`/certainrecipe?title=${encodeURIComponent(dinnerRecipe[dinnerrandArr[0]]._id)}` } style={styles.linkp}>

<p  
onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.MealParaTwo : styles.MealPara }

 
 >{dinnerRecipe[dinnerrandArr[0]].title}</p>


<p
 onMouseEnter={() => handleMouseEnter(6)}
 onMouseLeave={() => handleMouseLeave(6)}
 style={headerBools[6] ? styles.mealpara : styles.para }
 
 > <b>Description:</b> {dinnerRecipe[dinnerrandArr[0]].description}</p>

 
</Link>

</div>
</div>
</div> 

)}



{isOn && breakfastRecipe.length > 0  && lunchRecipe.length > 0 && dinnerRecipe.length > 0   && type == "OneMeal"  && mealtype != ""  &&(
    <div style={styles.buttonForm}>
<button

onMouseEnter={() => handleMouseEnter(7)}
 onMouseLeave={() => handleMouseLeave(7)}
 style={headerBools[7] ? styles.DeletebuttonAfter : styles.Deletebutton }

    onClick={handleButtonClickRand}
  >

Regenerate Meal
  </button>
</div>
)}





{isOn && breakfastRecipe.length === 0  && lunchRecipe.length === 0 && dinnerRecipe.length === 0 &&(
    <div style={styles.buttonForm}>
<h2 style = {styles.dayHeader}>No Recipes in your Profile Page. Please Add some recipes!</h2>
</div>
)}




{isOn && (breakfastRecipe.length === 0  || lunchRecipe.length === 0 || dinnerRecipe.length === 0) && type != "OneMeal" &&(
    <div style={styles.buttonForm}>
<h2 style = {styles.dayHeader}>Missing Breakfast and/or Lunch and/or Dinner Recipes!</h2>
</div>
)}


{isOn && type == "OneMeal"  && mealtype == "Breakfast" && breakfastRecipe.length === 0 && (
    <div style={styles.buttonForm}>
<h2 style = {styles.dayHeader}>Missing Breakfast Recipes!</h2>
</div>


)}


{isOn && type == "OneMeal"  && mealtype == "Lunch" && lunchRecipe.length === 0 && (
    <div style={styles.buttonForm}>
<h2 style = {styles.dayHeader}>Missing Lunch Recipes!</h2>
</div>


)}


{isOn && type == "OneMeal"  && mealtype == "Dinner" && dinnerRecipe.length === 0 && (
    <div style={styles.buttonForm}>
    <h2 style = {styles.dayHeader}>Missing Dinner Recipes!</h2>
    </div>
    
    
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
        padding: "1rem 1.7rem",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        margin: "0.6rem",
        fontFamily: "'Georgia', serif",
      },


      DeletebuttonAfter:{
        backgroundColor: "#000000",
        color: "#ffffff",
        border: "1.5px solid #000",
        borderRadius: "30px",
        padding: "1rem 1.7rem",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        margin: ".6rem",
        fontFamily: "'Georgia', serif",


      },

      buttonForm:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "3rem",
        flexDirection: "column",
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
          textAlign: "center",
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
         alignItems: "center",
      },

      fullformOneDay: {
        width: "100vw", // Use full viewport width
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "colum",
        flexWrap: "wrap",
        padding: "1rem 1.5rem",
        boxSizing: "border-box", // Ensure border/padding doesn’t reduce width
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      },


      MealHeader:{
        fontSize: "1.3rem",
        fontFamily: "'Georgia', serif",
      },

      MealHeaderTwo:{
        fontSize: "1.3rem",
        fontFamily: "'Georgia', serif",
        color: "#97AFCB",
      },

      MealPara:{
        fontSize: "1.3rem",
        fontFamily: "'Georgia', serif",
      },


      MealParaTwo:{
        fontSize: "1.3rem",
        fontFamily: "'Georgia', serif",
        color: "#97AFCB",
      },

      para:{
        fontFamily: "'Georgia', serif",

      },

      mealpara:{
        fontFamily: "'Georgia', serif",
        color: "#97AFCB",
      },
};


export default GenerateSevenDay







