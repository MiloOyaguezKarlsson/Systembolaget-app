$(document).ready(function() {
    // loadAllArtikels();
});

function loadStoreSearchData(str) {
    //Connection to get the stores in a city

    var url = "https://www.systembolaget.se/api/assortment/stores/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stores/xml",
        success: function(data) {
            findStore(str, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong with loding stores ");


        }
    });
}

function findStore(str, data) {
    //str is the city / area to search in and data is the data that ajax found

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
    //drink is twaht the user searches for and storeID is in with store we are lokking in


    var url = "https://www.systembolaget.se/api/assortment/stock/xml";
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stock/xml",
        success: function(data) {
            getStoreIventory(drink, storeID, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");


        }
    });
}

function getStoreIventory(drink, storeID, data) {
    //get the arikelnumbers for the arikels in a store and lokking if we are lokking for that artikel


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
            getArtikelInfoForStore(storeInventory, data, drink);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");


        }
    });
}

function getArtikelInfoForStore(storeInventory, data, drink) {
    //artikel id = storeInventory, data = xmlDoc, drink is waht is search for

    // get the info for the arikel number
    var artikelsWithInfo = [];

    for (var y = 0; y < storeInventory.length; y++) {

        for (var i = 0; i < data.getElementsByTagName("artikel").length; i++) {

            if (data.getElementsByTagName("artikel")[i].childNodes[0].textContent == storeInventory[y].textContent &&
                (data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase().includes(drink) ||
                    data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase() === drink ||
                    data.getElementsByTagName("artikel")[i].childNodes[4].textContent.toLowerCase().includes(drink) ||
                    data.getElementsByTagName("artikel")[i].childNodes[10].textContent.toLowerCase() === drink)) {
                artikelsWithInfo.push(data.getElementsByTagName("artikel")[i]);
            }
        }
    }

    buildSearchResultTable(artikelsWithInfo, artikelsWithInfo.length, drink);
}

// ------  For loading all Artikels
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

        }
    });

}

function getAllInventory(data) {
    var artikels = [];
    // saves the whoel systembolaget Libary in a array as xml
    var max = data.getElementsByTagName("artikel").length;
    for (var i = 0; i < max; i++) {
        artikels.push(data.getElementsByTagName("artikel")[i]);

    }

}
