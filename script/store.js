$(document).ready(function(){
    getStoreID();
});

function getStoreID(){
    var url = location.href;
    var storeID = url.substring(url.indexOf("?id=") + 4);

    document.getElementById("test").innerHTML += storeID;
}