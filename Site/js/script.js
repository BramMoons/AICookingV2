$(document).ready(function () {
  //TODO: remove init code
  var apiKey = 'de94f81ce9ab4cb4ba49ea8a87181ff9';

  var json = {
    "imageUrl": "http://dtsl.ehb.be/~willem-jan.pattyn/Innovation%20week/upload/image-5e3190aee21b7.jpg"
  }

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

  // var url = "https://api.spoonacular.com/recipes/findByIngredients";
  // $.ajax({
  //   url: url + "?apiKey=" + apiKey + "&ingredients=tomato,onion,chicken",
  //   contentType: 'application/json',
  //   dataType: 'json',
  //   context: document.body
  // }).done(function (output) {
  //   console.log(output);

  //   output.forEach(r => {
  //     elements = `<div class="card" style="width: 18rem; margin: 10px;">
  //      <img class="card-img-top" src="${r.image}" alt="${r.title}" style="height: 200px;>
  //      <div class="card-body">
  //        <p class="card-text">${r.title}</p>
  //        <p class="card-missing">Missing:</p>
  //        <p class="card-missingIng"> 
  //        `;
  //     r.missedIngredients.forEach(i => {

  //       elements += i.name + ", ";
  //     });
  //     elements += `</p>
  //     <a href="details.html?id=${r.id}" class="btn btn-outline-primary btn-lg btn-block">Get more information</a>
  //    </div>
  //   </div>`
  //     $(".card-columns").append(elements);
  //   });
  // });

  //Image upload
  //https://makitweb.com/how-to-upload-image-file-using-ajax-and-jquery/
  $("#fileUpload").change(function () {
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
            imageUrl: imageUrl
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
        url: '10.3.22.7:5005',
        type: 'post',
        data: json,
        dataType: 'json',
        success: function (response) {
          console.log(response);
          if (response != 0) {
            console.log('file sent');

            //Receive input from API and show recipes
            getRecipes(response);
          } else {
            alert('file not sent');
          }
        }
      });
    }

    function getRecipes(response) {
      //TODO: receive input from API and show recipes
      console.log(response);

      

      //PLACEHOLDER
      var url = "https://api.spoonacular.com/recipes/findByIngredients";
      $.ajax({
        url: url + "?apiKey=" + apiKey + "&ingredients=tomato,onion,chicken",
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
          r.missedIngredients.forEach(i => {
    
            elements += i.name + ", ";
          });
          elements += `</p>
          <a href="details.html?id=${r.id}" class="btn btn-outline-primary btn-lg btn-block">Get more information</a>
         </div>
        </div>`
          $(".card-columns").append(elements);
        });
      });
      //PLACEHOLDER
    }
  });
});