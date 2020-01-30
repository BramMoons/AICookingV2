$(document).ready(function () {
  var apiKey = 'de94f81ce9ab4cb4ba49ea8a87181ff9';

  //Get recipe ID
  var id = getParameterByName("id", window.location.href);
  var url = `https://api.spoonacular.com/recipes/`;

  $.ajax({
    url: url + id + "/information" + "?includeNutrition=true&apiKey=" + apiKey,
    contentType: 'application/json',
    dataType: 'json',
    context: document.body
  }).done(function (output) {
    console.log(output);
    var recipe = output;
    var instruction = `${recipe.instructions}`;
    var instructionReplace = instruction.replace(/ +(?= )/g, '');
    var instructionArr = instructionReplace.split('.');

    elements = `  
        <h1 class="my-4">${recipe.title}</h1>
    
        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <h3 class="my-3">Information</h3>
              <ul>
                <li>Servings: ${recipe.servings}</li>
                <li>Time: ${recipe.readyInMinutes} min</li>
              </ul>
            </div>
            
          </div>
          <div class="col-md-3">
            <h3 class="my-3">Calorieën</h3>
            <ul>
              <li>Protein: ${recipe.nutrition.caloricBreakdown.percentProtein}%</li>
              <li>Fat: ${recipe.nutrition.caloricBreakdown.percentFat}%</li>
              <li>Carbs: ${recipe.nutrition.caloricBreakdown.percentCarbs}%</li>
            </ul>
          </div>
        </div>

        <div class="row">
    
          <div class="col-md-8">
            <img class="img-fluid" src="${recipe.image}" alt="${recipe.title}">
          </div>

          <div class="col-md-3">
            <h3 class="my-3">Ingredients</h3>
            <ul>`
    recipe.extendedIngredients.forEach(i => {
      elements += "<li>" + i.original + "</li>"
    });
    elements += `</ul>
            
          </div>
  
          <div class="col-md-8">
            <h3 class="my-3">Instructions</h3>
            <ul>`
    for (let i = 0; i < instructionArr.length - 1; i++) {
      elements += "<li>" + instructionArr[i] + "</li>"
    }
    // instructionArr.forEach(i => {
    //  elements += "<li>" + i + "</li>"
    // });
    elements += `</ul>   
            </div>
  
          `;
    $("#containerInfo").append(elements);
  });

  //Get similar recipes
  var url2 = "https://api.spoonacular.com/recipes/";
  $.ajax({
    url: url2 + id + "/similar" + "?number=3&apiKey=" + apiKey,
    contentType: 'application/json',
    dataType: 'json',
    context: document.body
  }).done(function (output) {
    console.log(output);

    output.forEach(r => {
      elements = `<div class="card" style="width: 18rem; margin: 10px;">
       <img class="card-img-top" src="https://spoonacular.com/recipeImages/${r.image}" alt="${r.title}" style="height: 200px;">
       <div class="card-block">
          <p class="recipeTitle" class="card-text">${r.title}</p>
          `
      console.log(r.id);
      elements += `
          <a href="details.html?id=${r.id}" class="btn btn-outline-primary btn-lg btn-block">Get more information</a>
        </div>
      </div>`
      $(".card-columns").append(elements);
    });
  });

});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}