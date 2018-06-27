$(document).ready(function() {

    var arrPokemon = ["Bulbasaur" , "Charmander" , "Squirtle" , "Pikachu" , "Eevee" , 
                    "Chikorita" , "Cyndaquil" , "Totodile" , "Treeko" , "Torchic" ,
                    "Mudkip"];

    // makes a button of user search input
    function makeButton() {
        
        $(".buttonArea").empty();

        for (var i = 0; i < arrPokemon.length; i++) {
            // creates new button and adds class for future reference
            var button = $("<button>");
                button.addClass("pokemon");
                button.attr("data-name", arrPokemon[i]);
                button.text(arrPokemon[i]);
            $(".buttonArea").append(button);
        }

    };

    // adds click event to search button that provides input to makebutton()
    $("#find-pokemon").on("click", function(event) {
        event.preventDefault();  // makes sure things don't break
        var newPokemon = $("#pokemon-input").val().trim();
        arrPokemon.push(newPokemon);
        makeButton();
        $("#pokemon-input").val("");

    });

    makeButton();

    // main function for ajax gif grabbing and html placement
    function pokedex() {

        $(".gifArea").empty();
        var pokemon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + pokemon + 
                       "&api_key=Jd72kw6FN03BgBptJfnJ1Zf3J8ILXwf9";

        for (var i = 0; i < 10; i++) {
            
            // creates the ajax call for selected pokemon
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {

                console.log(response);

                    var pokeDiv = $("<div>");
                        pokeDiv.addClass("pokeDiv");
                    
                    var gif = response.data.images.fixed_height.url;
                    var image = response.data.images.fixed_height_still.url;

                    var pokeImage = $('<img class="pokeImage">');
                        pokeImage.attr("src", image);
                        pokeImage.attr("alt", "pokemon gif");
                        pokeImage.attr("data-still", image);
                        pokeImage.attr("data-animate", gif)
                        pokeImage.attr("data-state", "still");

                    var getRating = response.Rated;

                    var rating = $('<p class="rating">').text("Rating: " + getRating);

                    pokeDiv.prepend(pokeImage);
                    pokeDiv.append(rating);
                    $(".gifArea").append(pokeDiv);

            });

        };

    }

    // listener on pokemon class that runs pokedex function
    $(document).on("click", ".pokemon", pokedex);

    // click event that pauses and plays gifs
    $(document).on("click" , ".pokeImage" , function() {

        var state = $(this).attr("data-state");

        console.log("click!");
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
            else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
    
    });

});