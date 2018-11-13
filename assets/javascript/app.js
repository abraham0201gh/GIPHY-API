
    
$(document).ready(function() {    

    // fast food array 
    var topics = ["burritos", "chicken wings", "fried chicken", "fried fish", "hamburgers", "hot dogs", "noodles", "pizza", "sandwiches", "tacos"];

    // gif buttons and fast food data
    function makeButtons() {
            
        $("#gifButtons").empty();
        $("#fastFood-search").val("");  

        // fast food array loop
        for (var i = 0; i < topics.length; i++) {

            // jquery button creation for each item in array 
            var jqButton = $("<button>");
            
            jqButton.addClass("moreFastFood");
            
            jqButton.attr("foodName", topics[i]);
            
            jqButton.text(topics[i]);
            
            $("#gifButtons").append(jqButton);
            
        }
    }
    makeButtons(); 
    //adding items to view on click
    $("#add-fastFood").on("click", function(event) {
    event.preventDefault();
    
    var fastFoodChoice = $("#fastFood-search").val().trim();

    topics.push(fastFoodChoice);

    makeButtons();
    });

    //retrieve-display gifs
    $(document).on("click", ".moreFastFood", retrieveDisplayGif);
      
    function retrieveDisplayGif() {

        var fastFoodSelection = $(this).attr("foodName");
        
        // URL to search GIPHY (with 10 gif limit)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fastFoodSelection + "&api_key=9ReyQkPyjsdIKyGFu2d124MMVIwd8Dyx&limit=10";

        // AJAX call for each selection
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.data;

            //For loop  (rating, image, attributes, class, append, prepend images)
            for (var i = 0; i < results.length; i++) {
                
                var fastFoodDivHolder = $("<div class='fastFooditems'>");   
                var ratingStored = results[i].rating;
                var ratingElement = $("<p>").text("Rating: " + ratingStored);
                var imgURL = results[i].images.fixed_width_still.url;
                var image = $("<img>").attr("src", imgURL);   

                image.attr("imageStatus", "still");
                image.attr("url-Animate", results[i].images.fixed_width.url);
                image.attr("url-Still", results[i].images.fixed_width_still.url);
                image.addClass("itemPicked");
                
                fastFoodDivHolder.append(image);
                fastFoodDivHolder.append(ratingElement);
               
                $("#gifImageRatings").prepend(fastFoodDivHolder);
            }

            $(".itemPicked").on("click", clickGif);
        });
    }

    // clikc gif status (animate - still)
    function clickGif() {
            // get-set the value of any attribute on HTML element
        var state = $(this).attr("imageStatus");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("url-Animate"));
            $(this).attr("imageStatus", "animate");
        } else {
            $(this).attr("src", $(this).attr("url-Still"));
            $(this).attr("imageStatus", "still");
        }
    };
});
