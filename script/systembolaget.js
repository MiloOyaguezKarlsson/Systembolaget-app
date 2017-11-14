var stores= [];
$(document).ready(function() {
    //init

    //loadData();
    //loadStoreSearchData('KALMAR');
    loadStoreInventoryData(0801);
    // console.log(store);
});

function loadData() {
    var url = "https://www.systembolaget.se/api/assortment/stores/xml";


    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stores/xml",
        success: function(data) {
            buildTable(data);
        },
        datatype: "xml",

        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });
}

function loadStoreSearchData(str) {
    var url = "https://www.systembolaget.se/api/assortment/stores/xml";
    var x;
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stores/xml",
        success: function(data) {
            findStore(str, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });
}

function loadStoreInventoryData(str) {
    var url = "https://www.systembolaget.se/api/assortment/stock/xml";
    var x;
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + "https://www.systembolaget.se/api/assortment/stock/xml",
        success: function(data) {
            getStoreIventory(str, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });
}


function loadArtikelInfoData(str) {
    var url = "https://www.systembolaget.se/api/assortment/products/xml";
    var x;
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/" + url,
        success: function(data) {
            getArtikelInfo(str, data);
        },
        datatype: "xml",
        error: function() {
            alert("Error: Something went wrong");
            console.log(status);
        }
    });
}

function buildTable(str, data) {
    var x = data.getElementsByTagName("ButikOmbud")[0].childNodes[6].textContent;
    console.log(x);
    $("#content").html(data.getElementsByTagName("Info"));
    $("#content1").html(x);

}

function findStore(str, data) {
    // Finds By SokOrd of the XMLdoc and looks if str is a subbstring of that and returns all of them
    // data.getElementsByTagName("ButikOmbud").length
    var store = data.getElementsByName("ButikOmbud");
    var storesAddress = [];
    var storesInfo = [];
    // for getting the inventory in getStore Iventory getting the store id to controll the inventory
    var max = data.getElementsByTagName("ButikOmbud").length;
    for (var i = 0; i < max; i++) {
        var storeLocation = data.getElementsByTagName("ButikOmbud")[i].childNodes[6].textContent;
        if (storeLocation.includes(str)) {
            storesAddress.push(data.getElementsByTagName("ButikOmbud")[i].childNodes[3].textContent);
            storesInfo.push(data.getElementsByTagName("ButikOmbud")[i]);
        }
    }
    console.log(storesInfo);

}

function getStoreIventory(storeNr, data){
    //get the arikelnumbers for the arikels in a store
    var inventory= [];

    var max = data.getElementsByTagName("Butik").length;
    console.log(data.getElementsByTagName("Butik")[2].artikelNr);
    for (var i = 0; i < max; i++) {
        // console.log(data.getElementsByTagName("Butik")[i].attributes);
        if (data.getElementsByTagName("Butik")[i].attributes == storeNr) {
            inventory.push(data.getElementsByTagName("Butik")[i]);
        }

    }
    console.log(inventory);
}

function getArtikelInfo(arikelNr, data){
    // get the info for the arikel number
    var artikels= [];
    var max = data.getElementsByTagName("artikel").length;
    for (var i = 0; i < max; i++) {
        if (data.getElementsByTagName("artikel")[i].childNodes[0]) {
            artikels.push(data.getElementsByTagName("artikel")[i]);
        }
    }
    console.log(artikels);

}

function getAllInventory(data){
    var artikels =[];
    var max = data.getElementsByTagName("artikel").length;
    for (var i = 0; i < max; i++) {
            artikels.push(data.getElementsByTagName("artikel")[i]);

    }
    console.log(artikels);
}
