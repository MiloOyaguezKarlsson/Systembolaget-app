$(document).ready(function()
{
    var url = window.location.href;
    var id = url.substring(url.indexOf("?"), url.length);
    var data = getDrink(id);
    renderData(data);
});

function getDrink(id)
{
    var url = "http://www.thecocktaildb.com/api/json/v1/1/lookup.php" + id;
    
    return $.ajax({
        url:url,
        async:false,
        success:function(data)
        {
            
        },
        error:function(jqXHR, status, error)
        {
            alert("något gick fel med API-anslutningen");
            
        }
    }).responseJSON;
}

function renderData(data)
{
    $("title").append(data.drinks[0].strDrink);
    $("#category").append(data.drinks[0].strCategory);
    $("#name").append(data.drinks[0].strDrink);
    $("#desc").append(data.drinks[0].strInstructions);
    $("#pic").append("<img id='pic' src='" + data.drinks[0].strDrinkThumb + "'>");
    //ingredienser
    var ingredients = fixIngredients(data);
    for(var i = 0; i < ingredients.length; i++)
    {
        var str = "<li>" + ingredients[i] + "</li>";
        $("#ingredients").append(str);
    }
}

function fixIngredients(data)
{
    var temp = JSON.stringify(data);
    var ingredients = [];
    for(var i = 1; i < 15; i++)
    {
        //mea === measure
        var mea = temp.substring(temp.indexOf("strMeasure" + i), temp.indexOf("strMeasure" + (i + 1)));
        mea = mea.substring(mea.indexOf(":") + 2, mea.lastIndexOf(",") - 1);
        //ing === ingredient
        var ing = temp.substring(temp.indexOf("strIngredient" + i), temp.indexOf("strIngredient" + (i + 1)));
        ing = ing.substring(ing.indexOf(":") + 2, ing.lastIndexOf(",") - 1);
        //slår ihop mängd och ingrediens
        var str = mea + ing;
        //kollar om strängen är tom
        if(str !== " ")
        {
            ingredients.push(str);
        }
        else
        {
            break;
        }
    }
    return ingredients;
}

function replaceAll(str, find, replace)
{
    return str.replace(new RegExp(find, 'g'), replace);
}