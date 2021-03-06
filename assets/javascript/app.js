//  Variables

//  Array of meme topics
var topics = ["Doge" , "Forever Alone" , "Success Cat" , "Challenge Accepted" , "Yo Dawg" , "Grumpy Cat" , "Bye Felicia" , "All The Things" , "U Mad"];



//  Array of transport topics
var topics2 = ["Bicycle" , "Skateboard" , "Motorcycle" , "Skates" , "Bus" , "Truck" , "Boat" , "Plane" , "Train"];


//  Functions

//  Create and Render Buttons from meme topics array
function renderButtons () {
    $("#topics").empty();
    for (var i = 0 ; i < topics.length; i++) {
        var meme = $("<button>");
        meme.addClass("btn btn-info btn-lg meme");
        meme.attr("name", topics[i]);
        meme.text(topics[i]);
        $("#topics").prepend(meme);
    };
}

// Add new meme from user input in search box
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    var newMeme = $("#searchBox").val().trim();
    topics.push(newMeme);
    renderButtons();
    $("#searchBox").val("");

})

// Show GIF for button clicked
function displayMeme() {
    var meme = $(this).attr("name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + meme + "&api_key=wA3pNWYwAvLQPHR6rmf91QB6ctdGUQqc&limit=10";


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
                var gifImage = $("<img class='gifImage'>");

                gifImage.attr("src" , results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state" , "still");

                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);

                $("#images").prepend(gifDiv);
            }
        }
    });
};

//  Function to toggle gif pause/play on .gif click
$(document).on("click", ".gifImage", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});

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




$(document).on("click", ".meme", displayMeme);

renderButtons()