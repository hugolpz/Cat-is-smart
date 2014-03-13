/* ############## JSON EDITS UTILIES ###################  */ // <-------- To align
var getJsonValue = function (object, item) { return object[item]; }
var pushJsonVal = function (object, item, key, val) { object[item][key] = val; }

//META.Fn: pushVal.date
var getJsonVal = function(json, item) { getJsonValue(json, item); }; // <-------- replace all getJsonVal by getJsonVal_zh
var setJsonDate = function(json, item) { pushJsonVal(json, item, 'date', timeStamp( new Date())  ); };
var setJsonFavorite = function(json, item, val) { pushJsonVal(json, item, 'favorite', val); };
var setJsonScore = function(json, item) { pushJsonVal(json, item, 'score', calScoreItem(json, item) ) };

var getIndexedJsonValue = function (object, item, key, val) {
    o[item][key] = val;
}
var pushJsonVal = function (object, item, key, val) {
    object[item][key] = val;
}


/*
var calScoreItem = function (json, itemId) {
    for (i in json) {            // \ This 2
        if (json[i].zh === itemId) {  // / may be simplified
            var Imass = (json[i].rank) * (json[i].status) * calScoreSumRoots (json, itemId); // <-------------------- Formula (full mass)
            json[i].score = Imass ;
            console.log("Full item.score = " + json[i].score);
            break;
        }
    }
    return json;
} */


/* ################ ORDER: SUFFLE, KEEP ORDER, SORT ###################### */





/*
$(function() { 
can put all the code into this function but I don't want to.
});
*/








/* 

http://jsfiddle.net/hugolpz/QUTcW/68/
http://jsfiddle.net/hugolpz/ag7ka/
http://jsfiddle.net/hugolpz/RXe2t/9/

TO DO: 
1. Data gathering > alban. Alban.
2. Parse/Stringify workflow.

*/
/* STABLE STATE HERE */
/* TO DO : 
 * continue push to work on object rather than localstorage's string 
 * HTML : var json =  loadFileJSON : Done !
 * remove all JSON.parse(), rather work on object named: json

*/