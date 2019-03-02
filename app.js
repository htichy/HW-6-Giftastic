var apiKey = "n5hUBA1clKvFT1tLmaRKQ3gjlWy0Dkhz";
var musicians = ["Anderson .Paak", "Kendrick Lamar", "Chance The Rapper", "Alabama Shakes", "2Pac", "Notorious B.I.G.", "The Beatles", "Led Zeppelin", "Queen", "Kanye West", "Red Hot Chili Peppers"];
var btnContainer = $("#btn-container");
var gifContainer = $("#gif-container");

// iterates over set of musicians and calls functions makeButton and attachButton for each artist
for (var i = 0; i < musicians.length; i++) { 
	var artist = musicians[i];
	var btn = makeButton(artist);
    attachButton(btn);
}

// creates a new button using user input on click
$("#btn-submit").on("click", function(event) {
    event.preventDefault();
    attachButton(makeButton($("#new-btn").val()));
});

// calls the function getGifs on button click for that particular button
btnContainer.on("click", ".artist-btn", function(event) {
    getGifs(this.textContent);
});

// creates HTML button element
function makeButton(musician){
    return $("<button>").text(musician).attr("musician", musician).attr("class", "artist-btn");
}

// adds button to main button container
function attachButton(button) {
    btnContainer.append(button);
}

// Ajax calls the Giphy API passing musician as keyword in Giphy search
function getGifs(musician) {
    var queryUrl = "http://api.giphy.com/v1/gifs/search";
    $.ajax({
        url: queryUrl,
        method: "GET",
        data: {limit: 10, api_key: apiKey, q: musician}
      }).then(function(results) {
        displayGifs(results);
      });
}

// creates img element with gif URL
function createGif(gif) {
    return $("<img>").attr("src", gif.images.fixed_height_still.url);
}

// iterates over array of gif objects, calls createGif for each object, appends the result into the gif-container
function displayGifs(gifs) {
    for(var i = 0; i < gifs.data.length; i++) {
        var gifObj = gifs.data[i];
        var gif = createGif(gifObj);
        var rating = gifObj.rating;
        var figure = createFigure(gif, rating);
        gifContainer.append(figure);;
    }
}

// combines gif and rating into one figure element
function createFigure(gif, rating) {
    var figure = $("<figure>");
    var ratingBox = $("<figCaption>").text("rating: " + rating);
    figure.append(gif, ratingBox);
    return figure;
}

$("#gif-container").on("click", "img", function() {
    var src = $(this).attr("src");
  if($(this).hasClass("playing")){
     //stop
     $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass("playing");
  } else {
    //play
    $(this).addClass("playing");
    $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
  }
});
