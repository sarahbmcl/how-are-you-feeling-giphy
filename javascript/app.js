const topics = ["Angry", "Disgusted", "Fearful", "Happy", "Sad", "Surprised"];

for (let i = 0; i < topics.length; i++) {
    $("#buttonArea").append("<button type='button' class='btn btn-light gif-button' data-search='" + topics[i] + "'>" + topics[i] + "</button>")
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics[i] + "&api_key=faY502M74RA3tid3YkAoqH7IWgz6NgoM&limit=10";
}

//adds user input to a button and adds this button to the other buttons
$("#add-emotion").on("click", function (event) {
    event.preventDefault();
    let x = $("#user-input").val().trim();
    let newBtn = $("<button>");
    newBtn.addClass("gif-button btn btn-light")
    newBtn.text(x);
    newBtn.attr("data-search="+x);
    $("#buttonArea").append(newBtn);
    $("#user-input").val("");
    console.log(newBtn);
}); 

//GIF conditions when clicked
$(".gif-button").on("click", function () {
    let x = $(this).data("search");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=faY502M74RA3tid3YkAoqH7IWgz6NgoM&limit=10";

    //create a still gif
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response)  {
        for (let i = 0; i < response.data.length; i++) {
            let state = $(this).attr("data-state");
            $("#GIFArea").prepend("<div class='col-sm'><img src='" + response.data[i].images.fixed_width_still.url + "' data-still='" + response.data[i].images.fixed_width_still.url + "' data-animate='" + response.data[i].images.fixed_width.url + "' data-state='still' class='gif'><p>Rating: " + response.data[i].rating + "</p>");
        }
    //moving from still to animated 
    $(".gif").on("click", function () {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        });
    }); 
});


//additional  button attempt for user-button to pull up gif
// $("#add-emotion").on("click", function (event) {
//     event.preventDefault();
//     let x = $("#user-input").val().trim();
//     //console.log(newBtn)
//     topics.push(x);
//     // console.log(topics);
//     $("#buttonArea").append("<button type='button' class='btn btn-light gif-button' data-search='" + x + "'>" + x + "</button>");
// }); 