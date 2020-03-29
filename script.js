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
       fetch(``)
     }else{
       alert('Please enter a search term');
     }
  }



  //Event Listeners
   submit.addEventListener('submit', searchMeal);