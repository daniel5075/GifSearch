// vars
var topics = ["WTF", "OMG", "You've Got This", "I'm the Man",
    "Winning", "Damn I Look Good", "Are You Serious", "Happy Feet", "We are the Champions",
    "I'm Sick of it", "Hangry", "Namaste", "Time to Go", "Morning Already", "Why Am I Here"];
var topic = "";
var apiKey = "DfbUv8enI65mMRcdIEtYZdtlzyxtxJPY";
// var saying = "";
// var a = "";


function displayGif() {
    var rawName = $(this).attr("data-name");
    var gifName = (rawName.replace(/\s/g, "."));
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + gifName + "&limit=10&rating=PG&lang=en&offest=0"
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var gifRating = $("<div>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("class", "gif");
                gifImage.attr("src", results[i].images.fixed_height_still.url)
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(gifImage);
                gifDiv.append(gifRating);
                $("#displayGifs").prepend(gifDiv);
            }
        });
};

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
//Funtion for displaying buttons
function displayButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
        // console.log(a.text)
        console.log(topics[i])
    }
}

// adding additional sayings
$("#add-saying").on("click", function () {
    //disabling multiple clicks causing multiple inputs.
    if (topic !== $("#saying-input").val().trim()) {
        event.preventDefault();
        topic = $("#saying-input").val().trim();
        topics.push(topic);
        displayButtons();
    }
    else {
        return false;
    }
});




$(document).on("click", ".topic", displayGif);


displayButtons()