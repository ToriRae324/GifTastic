//  Variables

//  Array of transport topics
var topics2 = ["Bicycle" , "Skateboard" , "Motorcycle" , "Skates" , "Bus" , "Truck" , "Boat" , "Plane" , "Train"];


//  Functions

//  Create and Render Buttons from transport topics array
function renderButtons2 () {
    $("#transportTopics").empty();
    for (var i = 0 ; i < topics2.length; i++) {
        var transport = $("<button>");
        transport.addClass("btn btn-warning btn-lg transport");
        transport.attr("name", topics2[i]);
        transport.text(topics2[i]);
        $("#transportTopics").prepend(transport);
    };
}

// Add new transport from user input in search box
$("#searchButton2").on("click", function(event) {
    event.preventDefault();
    var newTransport = $("#searchBox2").val().trim();
    topics2.push(newTransport);
    renderButtons2();
    $("#searchBox2").val("");

})

// Show GIF for button clicked
function displayTransport() {
    var transport = $(this).attr("name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + transport + "&api_key=wA3pNWYwAvLQPHR6rmf91QB6ctdGUQqc&limit=10";


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
                var transportImage = $("<img class='transportImage'>");

                transportImage.attr("src" , results[i].images.fixed_height_still.url);
                transportImage.attr("data-still", results[i].images.fixed_height_still.url);
                transportImage.attr("data-animate", results[i].images.fixed_height.url);
                transportImage.attr("data-state" , "still");

                gifDiv.prepend(p);
                gifDiv.prepend(transportImage);

                $("#images").prepend(gifDiv);
            }
        }
    });
};

//  Function to toggle gif pause/play on .gif click
$(document).on("click", ".transportImage", function() {
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


$(document).on("click", ".transport", displayTransport);

renderButtons2()