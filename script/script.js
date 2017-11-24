//script-fil för mer almänna functioner, exempelvis jquery
$(document).ready(function(){
    //jqueryobjekt
    $map = $("#map").hide();

    $("#searchButton").click(function(){
        $map.slideDown(function(){
            loadStoreSearchData(document.getElementById("citySearchInput").value);
            initMap();
        });
    });
    $("#useMyLocation").click(function(){
        $map.slideDown(function(){
            getMyLocation(map, geocoder);
            initMap();
        });
    });
    //jquery-ui modal
    $("#ageConfirmation").dialog({
        dialogClass: "no-close", //krysset ska inte finnas
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
//kör geoCodeAddress funktionen för att placera ut markeringar på varje butik,
// denna körs ifrån funktionen som hämtar butiker från systembolagets api
function placeStores(storesAddress, city, storesID){
    for (var i = 0; i < storesAddress.length; i++) {
        var formattedCity = city.toLowerCase(); //sträng för att göra om staden som är all caps till bara första bokstaven stor
        formattedCity = formattedCity.charAt(0).toUpperCase() + formattedCity.slice(1);
        geocodeAddress(geocoder, map, storesAddress[i] + " " + formattedCity + " Sverige", storesID[i]);
    }
}
