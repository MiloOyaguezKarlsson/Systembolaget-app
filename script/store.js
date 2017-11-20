$(document).ready(function(){
    getStoreID();
});
//function för att hämta affärens id från url:en
function getStoreID(){
    var url = location.href;
    var storeID = url.substring(url.indexOf("?id=") + 4);

    document.getElementById("test").innerHTML += storeID;
    return storeID;
}