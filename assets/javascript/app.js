//  Variables

//  Array of meme topics
var topics = ["Doge" , "Forever Alone" , "Y U No" , "Philosoraptor" , "Challenge Accepted" , "Xzibit Yo Dawg" , "Grumpy Cat" , "Bye Felicia" , "All The Things" , "Business Cat" , "U Mad"];



//  Functions




// Show GIF for button clicked
function displayMeme() {
    var meme = $(this).attr("name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + meme + "&api_key=wA3pNWYwAvLQPHR6rmf91QB6ctdGUQqc&limit=10";

    console.log(queryURL);
    $.ajax({
        URL : queryURL,
        method : "GET"
    }).then(function(response){
        console.log(response);
    });

}

//  Create and Render Buttons from topics array
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

// Add new meme from user input
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    var newMeme = $("#searchBox").val().trim();
    topics.push(newMeme);
    renderButtons();

})




$(document).on("click", ".meme", displayMeme);
renderButtons()