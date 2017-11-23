$(document).ready(function(){
    getStoreID();
    loadStoreAddress();

    document.getElementById("searchDrinkBtn").addEventListener("click", function(){
        var query = document.getElementById("searchDrinkInput").value;
        loadStoreInventoryData(query.toLowerCase(), getStoreID());
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

function buildSearchResultTable(data, max, query) {
    var table_header = {name: "Namn", group: "Sort", price: "Pris", drinkSugestion: "Drink förslag"};
    var table = Mustache.render("<tr><th>{{name}}</th><th>{{group}}</th><th>{{price}}</th></tr>",
        table_header);
        console.log(max);
        console.log(data);
    for (var i = 0; i < max; i++) {
        var jsonObject= {
            Name: data[i].childNodes[3].textContent + " " +  data[i].childNodes[4].textContent,
            Varugrupp: data[i].childNodes[10].textContent,
            Prisinklmoms: data[i].childNodes[5].textContent,
        };
        if (data[i].childNodes[10].nodeName != "Varugrupp") {
            jsonObject.Varugrupp = data[i].childNodes[11].textContent;
        }

        table += Mustache.render("<tr><td>{{{Name}}}</td><td>{{{Varugrupp}}}</td><td>{{{Prisinklmoms}}}</td></tr>", jsonObject);
    }
    $("#searchResult").html(table);
    getDrinkSugestions(query);
}
function getDrinkSugestions(query){
    var drinkSugestions = getDrinks(query, 3);
    document.getElementById("drinkSugestions").innerHTML = "Drink förslag för " + query + ": ";
    for(var i = 0; i < drinkSugestions.drinks.length; i++){
        var hrefStr = "drink.html?i=" + drinkSugestions.drinks[i].idDrink; //sträng för href till drinken
        var aNode = document.createElement("A"); //skapa en a-tagg
        var textNode = document.createTextNode(drinkSugestions.drinks[i].strDrink + ", "); //text till a-taggen
        aNode.appendChild(textNode); //mata in texten i a-taggen
        aNode.setAttribute("href", hrefStr); //ändra href-attributet till hrefStr
        document.getElementById("drinkSugestions").appendChild(aNode); //lägga till a-taggen i en p-tagg
    }

}
function getDrinks(query, amount) {
    var url = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + query;
    var drinks;

    $.ajax({
        url:url,
        async:false,
        success:function(data)
        {
            drinks = '{"drinks":[';
            var check = ".";//används för att samma drink inte ska visas flera gånger

            for(var i = 0; i < amount; i++)//plockar ut ett antal drinkar
            {
                do
                {
                    //slumpar ett tal
                    var index = Math.floor(Math.random() * data.drinks.length);
                }
                    //om det slumpade talet finns i check så slumpar den igen
                while(check.indexOf("." + index + ".") > 0 && check !== ".");
                //lägger till det slumpade talet i check så att det inte kan slumpas igen
                check += index + ".";

                //lägg till drink i jsonobjekt som sedan returneras
                drinks += JSON.stringify(data.drinks[index]);
            };
            drinks += ']}';
            drinks = replaceAll(drinks, "}{", "},{");
            return drinks;
        },
        error:function(jqXHR, status, error)
        {
            alert("något gick fel med API-anslutningen");

        }
    });
    return JSON.parse(drinks);
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
