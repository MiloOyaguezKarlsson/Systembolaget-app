$(document).ready(function()
{
    var url = window.location.href;
    var id = url.substring(url.indexOf("?"), url.length);
    var data = getData(id);
    renderData(data);
});

function getData(id)
{
    var url = "http://www.thecocktaildb.com/api/json/v1/1/lookup.php" + id;
    
    return $.ajax({
        url:url,
        async:false,
        success:function(data)
        {
            return data;
        },
        error:function(jqXHR, status, error)
        {
            console.log("något gick fel med API-anslutningen");
            
        }
    }).responseJSON;
}

function renderData(data)
{
    console.log(data);
    $("title").append(data.drinks[0].strDrink);
    $("#name").append(data.drinks[0].strDrink);
    $("#desc").append(data.drinks[0].strInstructions);
    $("#pic").append("<img id='pic' src='" + data.drinks[0].strDrinkThumb + "'>");
}