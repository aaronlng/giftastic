//array of topics for buttons
var topics = ["baseball", "football", "basketball", "hockey"];

function displayTopicInfo() {
	var sports = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ydpNYoKMzr5HXnZB0XyNJBBVnCZJQCNI&q=" + sports + "&limit=10&offset=0&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (response) {
		var results = response.data;

		$("#gifDisplay").empty();

		for (var i = 0; i < results.length; i++) {

			var topicDiv = $("<div class='sports'>");
			var rating = response.data[i].rating;
			var pRate = $("<p>").text("Rating: " + rating);
			topicDiv.append(pRate);

			var giphyImgStill = response.data[i].images.downsized_still.url;
			var giphyImgMotion = response.data[i].images.downsized.url;
			var image = $("<img>").attr("src", giphyImgStill);

			image.attr("data-still", giphyImgStill);
			image.attr("data-animate", giphyImgMotion);
			image.attr("data-state", "still");
			image.attr("id", "img" + i)
			image.addClass("giphyImages");
			topicDiv.prepend(image);
			$("#gifDisplay").prepend(topicDiv);
		}
	});
}

function renderButtons() {
	$("#buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.addClass("btn btn-secondary btn-md m-2");
		a.attr("data-name", topics[i]);
		a.attr("type", "button");
		a.text(topics[i]);
		$("#buttons").append(a);
	}
}


$("#sportSub").on("click", function (event) {
	event.preventDefault();
	var topic = $("#sportInput").val().trim();
	topics.push(topic)
	$("form").trigger("reset")
	renderButtons();
});


$(document).on("click", ".topic", displayTopicInfo);
renderButtons();




$(document).on("click", ".giphyImages", flipAnimate);



function flipAnimate() {
	var item = $(this).attr("id");
	item = "#" + item;

	var state = $(item).attr("data-state");

	if (state === "still") {
		$(item).attr("src", $(item).attr("data-animate"));
		$(item).attr("data-state", "animate");

	} else {
		$(item).attr("src", $(item).attr("data-still"));
		$(item).attr("data-state", "still")}
}