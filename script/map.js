initMap();
var geocoder = new google.maps.Geocoder();
var map;
function initMap() {
    var sweden = {lat: 60.128, lng: 18.643};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: sweden
    });
    document.getElementById("knapp").addEventListener('click', function () {
        loadStoreSearchData(document.getElementById("input").value.toUpperCase());
    });
    document.getElementById("my-location").addEventListener('click', function () {
        getMyLocation(map, geocoder);
    });
}
function getMyLocation(resultMap, geocoder) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({
            map: resultMap,
            position: pos
        });
        resultMap.setCenter(pos);
        resultMap.setZoom(10);
        getCity(geocoder, pos);
    });
}
function getCity(geocoder, pos) {
    var stad = "";
    geocoder.geocode({'location': pos}, function (results, status) {

        if (status === 'OK') {
            console.log(results);
            for (var i = 0; i < results.length; i++) { //man får många adresser för den platsen, letar då upp den av dem som är en post ort
                for (var j = 0; j < results[i].types.length; j++) {
                    if (results[i].types[j] === "postal_town") {
                        stad = results[i].address_components[0].short_name;
                        doSomething(stad);
                    }
                }
            }
        } else {
            alert(status);
        }
    });
}

function geocodeAddress(geocoder, resultMap, address) {
    var address = address;
    geocoder.geocode({"address": address}, function (results, status) {
        if (status === "OK") {
            for (var i = 0; i < results.length; i++) {
                resultMap.setCenter(results[i].geometry.location);
                resultMap.setZoom(10);
                var marker = new google.maps.Marker({
                    map: resultMap,
                    position: results[i].geometry.location
                });
            }
        } else {
            alert("Something went wrong");
        }
    });

}