$(document).ready(function()
{
    var url = window.location.href;
    var id = url.substring(url.indexOf("?"), url.length);
    var data = getDrink(id);
    renderData(data);
    console.log(getDrinks("gin", 5));
    //var drinks = getDrinks("gin", 5).responseJSON;
    //console.log(drinks);
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
            console.log("något gick fel med API-anslutningen");
            
        }
    }).responseJSON;
}

function renderData(data)
{
    $("title").append(data.drinks[0].strDrink);
    $("#name").append(data.drinks[0].strDrink);
    $("#desc").append(data.drinks[0].strInstructions);
    $("#pic").append("<img id='pic' src='" + data.drinks[0].strDrinkThumb + "'>");
}
//hämtar önskat antal drinkar
function getDrinks(query, amount)
{
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
            console.log("något gick fel med API-anslutningen");
            
        }
    });
    return JSON.parse(drinks);
}

function fixIngredients(data)
{
    var temp = JSON.stringify(data);
    var ingredients = [];
    for(var i = 0; i < 16; i++)
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
        if(str !== "")
        {
            ingredients.push(str);
            console.log(str);
        }
        else
        {
            break;
        }
    }
    console.log("done!");
}

function replaceAll(str, find, replace)
{
    return str.replace(new RegExp(find, 'g'), replace);
}