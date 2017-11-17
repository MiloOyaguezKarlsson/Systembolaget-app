
$(document).ready(function(){
    //jqueryobjekt
    $map = $("#map").hide();

    $("#searchButton").click(function(){
        loadStoreSearchData(document.getElementById("citySearchInput").value);
        $map.slideDown();
    });
    $("#useMyLocation").click(function(){
        getMyLocation(map, geocoder);
        $map.slideDown();
    });

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
                $( this ).dialog( "close" );
            }
        }
    });
});

function placeStores(storesAddress, city, storesID){
    for (var i = 0; i < storesAddress.length; i++) {
        geocodeAddress(geocoder, map, storesAddress[i] + city + " sverige", storesID[i]);
    }
}
