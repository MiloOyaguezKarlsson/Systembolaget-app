$(document).ready(function() {
    // loadAllArtikels();
});

function loadStoreSearchData(str) {
    console.log("Connection");
    var url = "https://www.systembolaget.se/api/assortment/stores/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stores/xml",
        success: function(data) {
            findStore(str, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong with loding stores ");
            console.log(status);
        }
    });
}

function findStore(str, data) {
    console.log("searching for store");
    // Finds By SokOrd of the XMLdoc and looks if str is a subbstring of that and returns all of them
    var storesAddress = [];
    var storesID = [];
    // for getting the inventory in getStore Iventory getting the store id to controll the inventory
    for (var i = 0; i < data.getElementsByTagName("ButikOmbud").length; i++) {
        if (data.getElementsByTagName("ButikOmbud")[i].childNodes[6].textContent ===
        str.toUpperCase() && data.getElementsByTagName("ButikOmbud")[i].childNodes[0].textContent !== "Ombud") {
            storesAddress.push(data.getElementsByTagName("ButikOmbud")[i].childNodes[3].textContent);
            storesID.push(data.getElementsByTagName("ButikOmbud")[i].childNodes[1].textContent);
        }
    }
    placeStores(storesAddress, str.toUpperCase(), storesID);
}

function loadStoreInventoryData(drink, storeID) {
    console.log("Seaching for drink");
    var url = "https://www.systembolaget.se/api/assortment/stock/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stock/xml",
        success: function(data) {
            getStoreIventory(drink, storeID, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });
}

function getStoreIventory(drink, storeID, data) {
    console.log("Getting store inventory");
    //get the arikelnumbers for the arikels in a store
    var inventory = [];
    for (var i = 0; i < data.getElementsByTagName("Butik").length; i++) {
        if (data.getElementsByTagName("Butik")[i].getAttribute("ButikNr") === storeID) {
            for (var y = 0; y < data.getElementsByTagName("Butik")[i].childNodes.length; y++) {
                inventory.push(data.getElementsByTagName("Butik")[i].childNodes[y]);
            }
            i = data.getElementsByTagName("Butik").length;
        }
    }

    loadArtikelInfoDataForStore(inventory, drink);
}

function loadArtikelInfoDataForStore(storeInventory, drink) {
    var url = "https://www.systembolaget.se/api/assortment/products/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + url,
        success: function(data) {
            getArtikelInfoForStore(storeInventory, data, drink );
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });
}

function getArtikelInfoForStore(storeInventory, data, drink) {
    //artikel id = storeInventory

    // get the info for the arikel number
    var artikelsWithInfo = [];
    console.log("searching for drink :" + drink);
    //För testning så kör vi /2 
    for (var y = 0; y < storeInventory.length/2; y++) {

        for (var i = 0; i < data.getElementsByTagName("artikel").length; i++) {

            if (data.getElementsByTagName("artikel")[i].childNodes[0].textContent == storeInventory[y].textContent &&
            (data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase().includes(drink) ||
            data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase() === drink ||
            data.getElementsByTagName("artikel")[i].childNodes[4].textContent.toLowerCase().includes(drink) ||
            data.getElementsByTagName("artikel")[i].childNodes[10].textContent.toLowerCase() === drink) ) {
            artikelsWithInfo.push(data.getElementsByTagName("artikel")[i]);
            }
        }
    }
    buildSearchResultTable(artikelsWithInfo, artikelsWithInfo.length, drink);
}

// // Onödig nu mera
// function getTheDrink(drink, data) {
//     var artikels = [];
//     var name2 = "";
//     var name = "";
//     var group = "";
//     // get 3 artikels from the store
//     console.log(data[1]);
//     var max = data.length;
//     for (var i = 0; i < max; i++) {
//         name2 = data[i].childNodes[4].textContent;
//         name = data[i].childNodes[3].textContent;
//         group = data[i].childNodes[10].textContent;
//         //ajfdsoj
//         if (name === drink || name2.includes(drink) || group === drink) {
//             artikels.push(data[i]);
//         }
//         // Just cheking that if woked
//     }
//     console.log(artikels.length);
//     console.log(artikels[0]);
//     console.log(artikels[1]);
//     console.log(artikels[2]);
//     // ut skrifts funtion
//     buildSearchResultTable(artikels, artikels.length);
// }

// ------ Artikels
function loadAllArtikels() {
    var url = "https://www.systembolaget.se/api/assortment/products/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + url,
        success: function(data) {
            getAllInventory(data);
        },
        datatype: "xml",

        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });

}

function getAllInventory(data) {
    var artikels = [];
    // saves the whoel systembolaget Libary of artikels ass xml
    var max = data.getElementsByTagName("artikel").length;
    for (var i = 0; i < max; i++) {
        artikels.push(data.getElementsByTagName("artikel")[i]);

    }
    // Just cheking that if woked
    console.log(artikels[1]);

}
