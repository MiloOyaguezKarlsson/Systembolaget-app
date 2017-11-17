initMap();
var geocoder = new google.maps.Geocoder();
var map;
function initMap() {
    var sweden = {lat: 60.128, lng: 18.643};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: sweden
    });
}
//funktion för att hämta ungefär vart man är nu kör sedan getCity som hämtar vilken stad/post-ort man är i
function getMyLocation(resultMap, geocoder) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        resultMap.setCenter(pos);
        resultMap.setZoom(10);
        getCity(geocoder, pos);
    });
}
function getCity(geocoder, pos) {
    var city = "";
    geocoder.geocode({'location': pos}, function (results, status) {

        if (status === 'OK') {
            for (var i = 0; i < results.length; i++) { //man får många "adresser" för den platsen, letar då upp den av dem som är en post ort/stad
                for (var j = 0; j < results[i].types.length; j++) {
                    if (results[i].types[j] === "postal_town") {
                        city = results[i].address_components[0].short_name;

                        loadStoreSearchData(city); //hämta systembolaget butiker i staden
                    }
                }
            }
        } else {
            alert(status);
        }
    });
}

function geocodeAddress(geocoder, resultMap, address, storeID) {
    var address = address;
    geocoder.geocode({"address": address}, function (results, status) {
        if (status === "OK") {
            for (var i = 0; i < results.length; i++) {
                resultMap.setCenter(results[i].geometry.location);
                resultMap.setZoom(10);
                var marker = new google.maps.Marker({
                    map: resultMap,
                    position: results[i].geometry.location,
                    url: storeID //läggs på url:en för affären som en parameter
                });
                google.maps.event.addListener(marker, 'click', function() {
                    window.location.href = "store.html?id=" + marker.url;
                });
            }
        } else {
            alert("Something went wrong when geocoding " + status);
        }
    });
}