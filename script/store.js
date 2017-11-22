$(document).ready(function(){
    getStoreID();
    loadStoreAddress();
    buildSearchResultTable();

    document.getElementById("searchDrinkBtn").addEventListener("click", function(){
        var query = document.getElementById("searchDrinkInput").value;
        loadStoreInventoryData(query, getStoreID());
    });
});
//function för att hämta affärens id från url:en
function getStoreID(){
    var url = location.href; //hämta urlen
    var storeID = url.substring(url.indexOf("?id=") + 4); //hämta ut delen efter "?id=" för att få fram id:et

    return storeID;
}

// function för att hämta butikens address och skriva in den i en p-tagg
function loadStoreAddress(){
    var url = "https://www.systembolaget.se/api/assortment/stores/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stores/xml",
        success: function(data) {
            var id = getStoreID(); //id från urlen
            var stores = data.getElementsByTagName("ButikOmbud"); //alla butiker i xml format

            for (var i = 0; i < stores.length; i++) { //gå igenom alla butiker och ta den som har samma id som det id:et som hämtats från urlen
                var storeID = stores[i].childNodes[1].textContent;
                if (storeID === id) {
                    var post_ort = stores[i].childNodes[6].textContent.toLowerCase();
                    post_ort = post_ort.charAt(0).toUpperCase() + post_ort.slice(1);
                    document.getElementById("address").innerHTML += stores[i].childNodes[3].textContent + " "; //gatuaddress
                    document.getElementById("address").innerHTML += stores[i].childNodes[5].textContent + " "; //post-nr
                    document.getElementById("address").innerHTML += post_ort; //post-ort
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
function buildSearchResultTable(data) {
    var table_header = {name: "Namn", group: "Sort", price: "Pris", drinkSugestion: "Drink förslag"};
    var table = Mustache.render("<tr><th>{{name}}</th><th>{{group}}</th><th>{{price}}</th><th>{{drinkSugestion}}</th></tr>",
        table_header);
    // for (var i = 0; i < data.length; i++) {
    //     table += Mustache.render("<tr><td>{{{day}}}</td><td>{{{dish}}}</td><td>{{{alt_dish}}}</td></tr>",
    //         data.meals[i]);
    // }
    $("#searchResult").html(table);
}
