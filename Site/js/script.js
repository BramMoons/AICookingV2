$(document).ready(function () {
  //TODO: remove init code
  var apiKey = 'de94f81ce9ab4cb4ba49ea8a87181ff9';

  //Image upload
  //https://makitweb.com/how-to-upload-image-file-using-ajax-and-jquery/
  $("#fileUpload").change(function () {
    $(".card").remove();
    console.log("uploading...");
    var fd = new FormData();
    var files = $('#fileUpload')[0].files[0];
    fd.append('file', files);

    $.ajax({
      url: 'upload.php',
      type: 'post',
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response != 0) {
          var imageUrl = window.location.href + response;
          console.log(imageUrl);
          $("#uploadedImage").attr("src", response);

          var json = {
            "imageUrl": imageUrl
          }
          //Send image to our API
          sendImage(json);
        } else {
          alert('file not uploaded');
        }
      },
    });

    function sendImage(json) {
      console.log("sending image...");
      $.ajax({
        type: "post",
        url: "http://localhost:8080/test/image",
        data: JSON.stringify(json),
        contentType: 'application/json',
        dataType: "json",
        success: function (response) {
          console.log(response);
          if (response != 0) {
            console.log('file sent');
    
            //Receive input from API and show recipes
            getRecipes(response);
          } else {
            alert('file not sent');
          }
        },
        failure: function(e){
          console.log(e);
        }
      });
    }

    function getRecipes(response) {
      //TODO: receive input from API and show recipes
      console.log(response);

      var ingredientClasses = response.image.images[0].classifiers[0].classes;
      var ingredients = "";
      ingredientClasses.forEach(c =>{
        if(c.score >= 0.7){
          ingredients += c.xclass + ","
        }
      });

      console.log(ingredients);

      var url = "https://api.spoonacular.com/recipes/findByIngredients";
      $.ajax({
        url: url + "?apiKey=" + apiKey + "&ingredients=" + ingredients,
        contentType: 'application/json',
        dataType: 'json',
        context: document.body
      }).done(function (output) {
        console.log(output);
    
        output.forEach(r => {
          elements = `<div class="card" style="width: 18rem; margin: 10px;">
           <img class="card-img-top" src="${r.image}" alt="${r.title}" style="height: 200px;>
           <div class="card-body">
             <p class="card-text">${r.title}</p>
             <p class="card-missing">Missing:</p>
             <p class="card-missingIng"> 
             `;
          // r.missedIngredients.forEach(i => {
    
          //   elements += i.name + ", ";
          // });
          r.missedIngredients.forEach(i => {

            let l = r.missedIngredients[r.missedIngredients.length-1];
            if(i.name == l.name){
              elements += i.name;
            }
            else {
              elements += i.name+ ", ";
            }
          });
          elements += `</p>
          <a href="details.html?id=${r.id}" class="btn btn-outline-primary btn-lg btn-block">Get more information</a>
         </div>
        </div>`
          $(".card-columns").append(elements);
        });
      });
    }
  });
});