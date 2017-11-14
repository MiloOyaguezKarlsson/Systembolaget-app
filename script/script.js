function placeStores(stores, city){
    for (var i = 0; i < stores.length; i++) {
        geocodeAddress(geocoder, map, stores[i] + city + " sverige");
    }
}