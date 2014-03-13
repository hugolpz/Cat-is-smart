/* ######################### UI: HEADER, FOOTER ####################################  */
function appendJQMHeader(pageTitle) {
$('header')
  .append(
    '<div data-role="header" data-theme="a">'+
        '<h1>'+pageTitle+'</h1>'+
        '<a href="index.html"  data-transition="slide" data-rel="back" data-icon="home" data-iconpos="notext" data-ajax="true">Home</a>'+
    '</div><!-- /header -->');
}

function appendJQMFooter(left, right) {
$('footer')
  .append('<footer data-role="footer" data-theme="a" class="jqm-footer"><p>&copy;'+left+'!</p><p class="jqm-version">—'+right+'</p></footer>');
}


/* ######################### DATA: ####################################  */
// See : data/status-starter.json ; data/cfdict.json

//Meta.Fn: loadFileJson (first App run)
function loadFileJSON(toLocalStorage, fromUrl) {
    if (localStorage[toLocalStorage]) { console.log("Good! Data already loaded locally!"); } 
    else { 
        $.getJSON(fromUrl, function (data) {
            localStorage[toLocalStorage] = JSON.stringify(data);
            console.log("Damn! Data not yet loaded locally! Ok: I loaded it!");
            console.log("Data string: " + localStorage[toLocalStorage]);
        });
    }
}

// loadFileJSON( 'jsonStatus0711b', 'http://d.codio.com/hugolpz/Cat-is-smart/data/status-starter.json');
// var json = JSON.parse( localStorage.jsonStatus0710b ); 

/* To store JSON in localStorage, you compress it as string */
// localStorage["results"] = JSON.stringify(jsonStatus); // or lS.restults
/* Whenever you want to work on it, need to uncompress the JSON */
// var json = JSON.parse(localStorage["results"]);


/* ############## JSON: getVal, PUSHVAL, setJsonDate, makeSTAMP ###################  */
// TODO : to align into 

//META.Fn: getVal
function getJsonVal(json, itemId) {  
    for (var i in json) {
        if (json[i].zh == itemId) {
            return json[i]; //.rank
        }
    }
}

/* ----- PUSH SERIE ---- */
//META.Fn: pushVal.status
function setJsonStatus(json, itemId, val) {
    for (var i in json) {
        if (json[i].zh == itemId) {
            json[i].status = val;
            break;
        }
    } return json;
}

//META.Fn: pushVal.date
function setJsonDate(json, itemId, val) {
    for (var i in json) {
        if (json[i].zh == itemId) {
            json[i].date = val;
            break;
        }
    } return json;
}

//META.Fn: pushVal.favorite
function setJsonFavorite(json, itemId, val) {
    for (var i in json) {
        if (json[i].zh == itemId) {
            json[i].favorite = val;
            break;
        }
    } return json;
}

//META.Fn: update all scores
function updateJsonScores(stringTarget) {
    json = JSON.parse(stringTarget);
    console.log("JS: parsed!"+ stringTarget);
    for (j in json) {
        setJsonScore(json, json[j].zh);
    }
    stringTarget = JSON.stringify(json);
    console.log("JS: stringified!");
    console.log("current stringTarget:" + stringTarget);
    json = JSON.parse(stringTarget); //???
}

//META.Fn: pushVal.score /RBSC9/9/
function setJsonScore(json, itemId) {
    // 1. Mass of compounds (zis):
    var c = itemId.split("");
    var sum = 0;
    console.log("c = " + c);
    for (i in c) {
        console.log("c[i] = " + c[i]);
        sum = sum + (getJsonVal(json, c[i]).status * getJsonVal(json, c[i]).rank); // <-------- Formula (components mass)
        console.log("sum = " + sum + "(i:" + i + ")");
        i = i + 1;
    } // return sum
    console.log("sum out = " + sum);

    // 2. Mass of item (ci) = Imass = IfRank * Istatus * [ ∑ (CfRank * Cstatus)]
    for (i in json) {            // \ This 2
        if (json[i].zh == itemId) {  // / may be simplified
            var Imass = (json[i].rank) * (json[i].status) * sum; // <-------------------- Formula (full mass)
            json[i].score = Imass ;
            console.log("Full item.score = " + json[i].score);
            break;
        }
    } return json;   
}

//META.Fn: makeStamp() create a timestamp yyyyMMDDhhmmss
    function makeStamp(d) { // Date d
        var y = d.getUTCFullYear(),
            M = d.getUTCMonth() + 1,
            D = d.getUTCDate(),
            h = d.getUTCHours(),
            m = d.getUTCMinutes(),
            s = d.getUTCSeconds();
            ms = d.getMilliseconds();
        function pad(x) { // or pad = function(x) {}; call etant pad(...);
                x = x+'';
                if (x.length === 1) { return '0' + x;}
                return x;
            }
        function pad2(x) { // or pad = function(x) {}; call etant pad(...);
                x = x+'';
                if (x.length === 1) { return '00' + x; }
                if (x.length === 2) { return '0'  + x; }
                return x;
            }
        return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad2(ms);
    }



/* ######################### SWITCH: CSS-JS ####################################  */


    //META.Fn: loadSwitch [localStorage  => CSS]
    function setLexemeStatusCSS() {
        console.log("setLexemeStatusCSS = Fired !");
        $("button").each(function a(i) {
            console.log("lexeme1");
            var lexeme = $(this).data('lexeme');
            console.log("lexeme = " + lexeme);
            var val = getJsonVal(json, lexeme);
           //setTimeout(function () {
                if (val.status === 1) {
                    $(this).toggleClass('status1 status0');
                } else { /* nothing yet! */ }
           // }, 1000);
        });
        console.log("setLexemeStatusCSS = End !");
    }
    

    //META.Fn: clickSwitch [localStorage & CSS]
    function clickChangeLexemeStatus() {
        var lexeme = $(this).closest(".tpl").data('lexeme');
        var val = getJsonVal(json, lexeme); //pull
        console.log("3. Button clicked & lexeme updated is:" + lexeme+".    Former value was:"+val.status);
            if (val.status == 1) { // update storage and CSS
                setJsonStatus(json, lexeme, 0.01); //push
                setJsonDate(json, lexeme, makeStamp(new Date()) ); //push
                setJsonScore(json, lexeme);
            } else { // (mirror)
                setJsonStatus(json, lexeme, 1); //push
                setJsonDate(json, lexeme, 0);   //push                
                setJsonScore(json, lexeme);    //push
            }
            $(this).toggleClass('status0').toggleClass('status1');
        console.log("4. After click & compiled JSON:" + JSON.stringify(json));
    } // end button Fn.clickSwitch


/* ################ SUFFLE, KEEP ORDER, SORT ###################### */

/* META.Fn: Shuffle */
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/* META.Fn: Same (alternative to fn.Shuffle) */
function same(o){
    o = o;
}

//META.fn: sortJSON
function sortJSON(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') {return ((x < y) ? -1 : ((x > y) ? 1 : 0));}
        if (way === '321') {return ((x > y) ? -1 : ((x < y) ? 1 : 0));}
    });
}

/*
$(function() { 
can put all the code into this function but I don't want to.
});
*/

/* ######################### TEMPLATING: FOCUSLIST: ####################################  */

/* META.fn: getMyList                   See: /hugolpz/WKcGr/   */
// :def: get the list of n next unkown lexies. Do: slice unknow, sort, slice n lexies, return zh keys
// @lSdata : localStorage data, is store as string, JSON.parse() run on it.
// @n: number n of unknow lexies to get.
// @: need more parameters for: lexem length, date/historic, favorite.   < --------------------------------------------------------- Todo
function getMyList(lSdata, n) {      // < --------------------------------------------------------------------------- Add attributes
    var result = JSON.parse(lSdata)
   .filter(function (i) {
        return i["status"] === 1 ; //slice status=1 (condition)
    })/*
    .filter(function (i) {
        return i["zh"].length =3; //slice status=1 (condition)
    }) */
    .sort(function (a, b) {
        return a["score"] - b["score"]; //sort 
    })
    .slice(0, n) //top n entries
    .map(function (i) { 
        return i["zh"]; //return keys
    });
    return result;
}


/* ######################### TEMPLATING: PROJECTION ####################################  */
/* META.fn: injectTPL (mustache). See: /hugolpz/WKcGr/ */ 
// :def: inject the items within the body's anchor
// @url: url of json dictionary
// @list: list (object) of keys for items to display
// @tplId: html id of js template within the html page
// @anchor: html id of the html anchor/container to receive the items.
function injectTPL(url, list, tplId, anchor, callback) {
    console.log("Mustache TPL = Fired !");
    $.getJSON(url, function(data) {
        for (var i=0; i<list.length; i++) {
            var lexeme = list[i]; // "火山口";
            var template = '{{#CFDICT}}{{#'+ lexeme +'}}' + $(tplId).html() + '{{/'+ lexeme +'}}{{/CFDICT}}';
            var info = Mustache.to_html(template, data);
            $(anchor).append(info);
        }
        callback();  // Invoke our own callback.
    });
    console.log("Mustache TPL = End !");
}


/* 

http://jsfiddle.net/hugolpz/QUTcW/68/
http://jsfiddle.net/hugolpz/ag7ka/
http://jsfiddle.net/hugolpz/RXe2t/9/

TO DO: 
1. Data gathering > alban. Alban.
2. Parse/Stringify workflow.

*/