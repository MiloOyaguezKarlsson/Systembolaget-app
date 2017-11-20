$(document).ready(function(){
    getStoreID();
    loadStoreAddress();
});
//function för att hämta affärens id från url:en
function getStoreID(){
    var url = location.href; //hämta urlen
    var storeID = url.substring(url.indexOf("?id=") + 4); //hämta ut delen efter "?id=" för att få fram id:et

    return storeID;
}
function loadStoreAddress(){
    var url = "https://www.systembolaget.se/api/assortment/stores/xml";
    var x;
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stores/xml",
        success: function(data) {
            var id = getStoreID();
            var stores = data.getElementsByTagName("ButikOmbud");
            var max = stores.length;
            console.log(max);
            for (var i = 0; i < max; i++) {
                var storeID = stores[i].childNodes[1].textContent;
                if (storeID === id) {
                    document.getElementById("address").innerHTML += stores[i].childNodes[3].textContent;

                }
            }
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong with loading stores ");
            console.log(status);
        }
    });
}