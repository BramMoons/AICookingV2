$(document).ready(function () {
  var apiKey = 'b4fba642a06e4566a8c81148feec47ac';

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
      <div class="row" id="titel">
        <a href="../innovation" style="margin-top: 30px;">
          <img alt="Home" src="assets/home.png">
        </a>
        <div class="title">
          <h1 class="my-4">${recipe.title}</h1>
        </div>
      </div>
        <div class="row" id="info">
          <div class="col">
            <div class="row">
              <h3 class="my-3">Information: </h3>
              <ul style="margin-top: 1.5rem;">
                <li>Servings: ${recipe.servings}</li>
                <li>Time: ${recipe.readyInMinutes} min</li>
              </ul>
            </div>
            
          </div>
          <div class="col">
            <div class="row">
              <h3 class="my-3">Calories:</h3>
              <ul style="margin-top: 1.5rem;">
                <li>Protein: ${recipe.nutrition.caloricBreakdown.percentProtein}%</li>
                <li>Fat: ${recipe.nutrition.caloricBreakdown.percentFat}%</li>
                <li>Carbs: ${recipe.nutrition.caloricBreakdown.percentCarbs}%</li>
              </ul>
            </div
          </div>
          </div>
          <div class="w-100"></div>
        </div>

        <div class="row">
          <div class="col">
            <img class="img-fluid" src="${recipe.image}" alt="${recipe.title}">
          </div>

          <div class="col">
            <h3 class="my-3">Ingredients:</h3>
            <ul>`
              recipe.extendedIngredients.forEach(i => {
              elements += "<li>" + i.original + "</li>"
              });
              elements += `</ul>
            
          </div>
          <div class="w-100"></div>
        </div>
  
        <div class="row">
          <div class="col">
            <h3 class="my-3">Instructions</h3>
            <ul>`
              for (let i = 0; i < instructionArr.length -1; i++) {
                elements += "<li>" + instructionArr[i] + "</li>"
              }
              elements += `</ul>   
          </div>
          <div class="w-100"></div>
        </div>
          `;
        $("#containerInfo").append(elements);
  });

  var urltwee = "https://api.spoonacular.com/recipes/";
  $.ajax({
    url: urltwee + id + "/similar" + "?number=3&apiKey=" + apiKey,
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