//  Variables

//  Array of foods topics
var topics3 = ["Bacon" , "Carrots" , "Burgers" , "Salad" , "Rice" , "Pie" , "Cake" , "Steak"];


//  Functions

//  Create and Render Buttons from transport topics array
function renderButtons3 () {
    $("#foodsTopics").empty();
    for (var i = 0 ; i < topics3.length; i++) {
        var foods = $("<button>");
        foods.addClass("btn btn-success btn-lg foods");
        foods.attr("name", topics3[i]);
        foods.text(topics3[i]);
        $("#foodsTopics").prepend(foods);
    };
}

// Add new transport from user input in search box
$("#searchButton3").on("click", function(event) {
    event.preventDefault();
    var newFood = $("#searchBox3").val().trim();
    topics3.push(newFood);
    renderButtons3();
    $("#searchBox3").val("");

})

// Show GIF for button clicked
function displayFoods() {
    var food = $(this).attr("name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=wA3pNWYwAvLQPHR6rmf91QB6ctdGUQqc&limit=10";


    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response){

        var results = response.data;

        //  Loop for number of responses. Display data
        for (var i = 0 ; i < results.length ; i++) {
            
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='gif'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var foodsImage = $("<img class='foodsImage'>");

                foodsImage.attr("src" , results[i].images.fixed_height_still.url);
                foodsImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodsImage.attr("data-animate", results[i].images.fixed_height.url);
                foodsImage.attr("data-state" , "still");

                gifDiv.prepend(p);
                gifDiv.prepend(foodsImage);

                $("#images").prepend(gifDiv);
            }
        }
    });
};

//  Function to toggle gif pause/play on .gif click
$(document).on("click", ".foodsImage", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


// Main topic buttons
$("#memeButton").on("click", function() {
    $("#memeTopicsRow").css("display", "flex");
    $("#transportTopicsRow").hide();
    $("#foodsTopicsRow").hide();
})

$("#transportButton").on("click", function() {
    $("#memeTopicsRow").hide();
    $("#transportTopicsRow").css("display", "flex");
    $("#foodsTopicsRow").hide();
})

$("#foodsButton").on("click", function() {
    $("#memeTopicsRow").hide();
    $("#transportTopicsRow").hide();
    $("#foodsTopicsRow").css("display", "flex");
})


$(document).on("click", ".foods", displayFoods);

renderButtons3()