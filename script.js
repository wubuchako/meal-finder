// カンマで区切ると、const書かなくて良い
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

  // search meal and fetch from API
  function searchMeal(e){
     e.preventDefault();

     //clear single meal
     single_mealEl.innerHTML = '';

     //Get serach term
     const term = search.value;

     //Check for empty
     if (term.trim()){
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
       .then(res => res.json())
       .then(data => {
          console.log(data);
          resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

          if(data.meals === null){
            resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
          } else {
            mealsEl.innerHTML = data.meals
            .map(
              meal=>
              `<div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                </div>
                </div>`
            )
            .join('');
          }
       });
       //Clear search text
       search.value ='';
     } else {
       alert('Please enter a search term');
     }
  }

  //Fetch meal by ID
  function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
  }

  //Add meal to DOM
  function addMealToDOM(meal){
    const ingredients = [];

    for(let i=1; i <= 20; i++){
      if(meal[`strIngredient${i}`]){
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      } else {
        break;
      }
    }
  }

  //Event Listeners
   submit.addEventListener('submit', searchMeal);

   mealsEl.addEventListener('click', e => {
     const mealInfo = e.composedPath.find(item => {
       if(item.classList){
        return item.classList.contains('meal-info');
       }else {
         return false;
       }
     });

     if(mealInfo){
       const mealID = mealInfo.getAttribute('data-mealid');

       getMealById(mealID);
     }
   });