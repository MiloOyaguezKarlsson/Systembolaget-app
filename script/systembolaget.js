$(document).ready(function() {
    //init

    //loadData();
    //loadStoreSearchData('KALMAR');;
    // console.log(store);
    loadAllArtikels();
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
    // data.getElementsByTagName("ButikOmbud").length
    // var city = str.toUpperCase();
    // var store = data.getElementsByName("ButikOmbud");
    var storesAddress = [];
    var storesID = [];
    // for getting the inventory in getStore Iventory getting the store id to controll the inventory
    // var max = data.getElementsByTagName("ButikOmbud").length;
    for (var i = 0; i < data.getElementsByTagName("ButikOmbud").length; i++) {
        // var storeLocation = data.getElementsByTagName("ButikOmbud")[i].childNodes[6].textContent;
        // var notOmbud = data.getElementsByTagName("ButikOmbud")[i].childNodes[0].textContent;
        if (data.getElementsByTagName("ButikOmbud")[i].childNodes[6].textContent ===
        str.toUpperCase() && data.getElementsByTagName("ButikOmbud")[i].childNodes[0].textContent !== "Ombud") {
            storesAddress.push(data.getElementsByTagName("ButikOmbud")[i].childNodes[3].textContent);
            storesID.push(data.getElementsByTagName("ButikOmbud")[i].childNodes[1].textContent);
        }
    }
    //console.log(storesID);
    // console.log(storesAddress);
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
    // var max = data.getElementsByTagName("Butik").length;
    // console.log(storeID);
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
    // var max = data.getElementsByTagName("artikel").length;
    // var name2 = "";
    // var name = "";
    // var group = "";
    // var maxAll = storeInventory.length;
    for (var y = 0; y < storeInventory.length; y++) {
        for (var i = 0; i < data.getElementsByTagName("artikel").length; i++) {
            // name = data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase();
            // name2 = data.getElementsByTagName("artikel")[i].childNodes[4].textContent.toLowerCase();
            // group = data.getElementsByTagName("artikel")[i].childNodes[10].textContent.toLowerCase();

            if (data.getElementsByTagName("artikel")[i].childNodes[0].textContent == storeInventory[y].textContent &&
            (data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase().includes(drink) ||
            data.getElementsByTagName("artikel")[i].childNodes[3].textContent.toLowerCase() === drink ||
            data.getElementsByTagName("artikel")[i].childNodes[4].textContent.toLowerCase().includes(drink) ||
            data.getElementsByTagName("artikel")[i].childNodes[10].textContent.toLowerCase() === drink) ) {
            artikelsWithInfo.push(data.getElementsByTagName("artikel")[i]);
            }
        }
        // console.log(y);
    }
    // console.log(artikelsWithInfo);
    // console.log("HE");

    buildSearchResultTable(artikelsWithInfo, artikelsWithInfo.length, drink);

    // getTheDrink(drink, artikelsWithInfo);
}
// Onödig nu mera
function getTheDrink(drink, data) {
    var artikels = [];
    var name2 = "";
    var name = "";
    var group = "";
    // get 3 artikels from the store
    console.log(data[1]);
    var max = data.length;
    for (var i = 0; i < max; i++) {
        name2 = data[i].childNodes[4].textContent;
        name = data[i].childNodes[3].textContent;
        group = data[i].childNodes[10].textContent;
        //ajfdsoj
        if (name === drink || name2.includes(drink) || group === drink) {
            artikels.push(data[i]);
        }
        // Just cheking that if woked
    }
    console.log(artikels.length);
    console.log(artikels[0]);
    console.log(artikels[1]);
    console.log(artikels[2]);
    // ut skrifts funtion
    buildSearchResultTable(artikels, artikels.length);
}

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

// function loadFindADrink(drink) {
//     var url = "https://www.systembolaget.se/api/assortment/products/xml";
//     $.ajax({
//         url: "https://cors-anywhere.herokuapp.com/" + url,
//         success: function(data) {
//             getADrink(drink, data);
//         },
//         datatype: "xml",
//
//         error: function() {
//             alert("Error: Something went wrong");
//             console.log(status);
//         }
//     });
//
// }
//
// function getADrink(drink, data) {
//     var artikels = [];
//     var name2 = "";
//     var name = "";
//     var group = "";
//     // get 3 artikels from the store
//     console.log(data.getElementsByTagName("artikel")[12].childNodes[10]);
//     var max = data.getElementsByTagName("artikel").length;
//     for (var i = 0; i < max; i++) {
//         name2 = data.getElementsByTagName("artikel")[i].childNodes[4].textContent;
//         name = data.getElementsByTagName("artikel")[i].childNodes[3].textContent;
//         group = data.getElementsByTagName("artikel")[i].childNodes[10].textContent;
//         if (group.contains(drink)) {
//             artikels.push(data.getElementsByTagName("artikel")[i]);
//         }
//         // Just cheking that if woked
//     }
//     console.log(artikels[i]);
// }
//
// function load3Random() {
//     var url = "https://www.systembolaget.se/api/assortment/products/xml";
//     $.ajax({
//         url: "https://cors-anywhere.herokuapp.com/" + url,
//         success: function(data) {
//             get3RandomArtikels(data);
//         },
//         datatype: "xml",
//
//         error: function() {
//             alert("Error: Something went wrong");
//             console.log(status);
//         }
//     });
//
// }
//
//
// function get3RandomArtikels(data) {
//     var artikels = [];
//
//     // get 3 artikels from the store
//     var max = data.getElementsByTagName("artikel").length;
//     for (var i = 0; i < 3; i++) {
//         var maxInt = Math.floor(Math.random() * max);
//         artikels.push(data.getElementsByTagName("artikel")[maxInt]);
//         console.log(artikels[i]);
//         // Just cheking that if woked
//     }
//
// }
