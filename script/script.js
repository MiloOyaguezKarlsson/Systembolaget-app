//script-fil för mer almänna functioner, exempelvis jquery

$(document).ready(function(){
    //jqueryobjekt
    $map = $("#map");//.hide();

    $("#searchButton").click(function(){
        loadStoreSearchData(document.getElementById("citySearchInput").value);
        //$map.slideDown();
    });
    $("#useMyLocation").click(function(){
        getMyLocation(map, geocoder);
        //$map.slideDown();
    });
    //jquery-ui modal
    $("#ageConfirmation").dialog({
        resizable: false,
        draggable: false,
        height: "auto",
        width: "auto",
        modal: true,
        buttons: {
            "Jag är 20 år gammal eller äldre": function() {
                $( this ).dialog( "close" );
            },
            "Jag är under 20 år gammal": function() {
                window.location.href = "under20.html";
            }
        }
    });
});

function placeStores(storesAddress, city, storesID){
    for (var i = 0; i < storesAddress.length; i++) {
        var formattedCity = city.toLowerCase(); //sträng för att göra om staden som är all caps till som vi vill ha det
        formattedCity = formattedCity.charAt(0).toUpperCase() + formattedCity.slice(1);
        console.log(formattedCity);
        geocodeAddress(geocoder, map, storesAddress[i] + " " + formattedCity + " Sverige", storesID[i]);
    }
}
