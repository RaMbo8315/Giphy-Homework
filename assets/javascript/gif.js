
var movies = ["The Goonies", "Anchorman", "Beetlejuice", "Rocky", "Scarface", "The Dark Knight", "Star wars",
  "Waynes World", "The Sandlot"];

function displayGifs () {
  $("#gifDiv").empty();
  var showMovie = $(this).attr("data-name"); 
  var APIKey = "qnRwPk27CX5fqcmxalzt0o1BMptw9z0G"
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+showMovie+"&apikey="+APIKey+"&limit=10&rating=pg-13";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='thumbnail gifBox'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var movieImage = $("<img>");
      movieImage.addClass("gif");
      movieImage.attr("src", results[i].images.fixed_height_small_still.url);
      movieImage.attr("data-still", results[i].images.fixed_height_small_still.url);
      movieImage.attr("data-animate", results[i].images.fixed_height_small.url)
      movieImage.attr("data-state", "still")
      gifDiv.prepend(p);
      gifDiv.prepend(movieImage);
      $("#gifDiv").prepend(gifDiv);
    }
  });
};

$("#add-movie").on("click", function (event) {
  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  movies.push(movie);
  createButtons();
});

function createButtons() {
  $("#storeBtn").empty();
  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("btn btn-default btn-info movie");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    $("#storeBtn").append(a);
  }
};

 function state () {
  var state = $(this).attr("data-state");
  if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
  } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
  }
};

createButtons();

$(document).on("click", ".gif", state);

$(document).on("click", ".movie", displayGifs);
