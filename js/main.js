/* ############################################################################# */
/* ###############module: #####  0. M E T A & G U I D E L I N E S  ############# */
/* ############################################################################# * /
 * runMyFunction: 
 * myParametter:
 * myVar: 


/* ############################################################################# */
/* ###############module: #####  1. W R A P P I N G   D O M ############ */
/* ############################################################################# */

/* ######################### UI: HEADER, FOOTER ####################################  */
function appendJQMHeader(pageTitle) {
$('header')
  .append(
'<nav class="navbar navbar-default navbar-fixed-top" role="navigation">'
+'	<div class="container-fluid">'
+'		<!-- Brand and toggle get grouped for better mobile display -->'
+'		<div class="navbar-header">'
+'			<a href="./index.html" class="navbar-brand" style="padding: 1px 1px 1px 3px;"><img src="../img/cfdict.png" width="48px" alt="CFDict"></a>'  
+'			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#cfdict-navbar-collapse">'
+'				<span class="sr-only">Toggle navigation</span>  <span class="icon-bar"></span>  <span class="icon-bar"></span>  <span class="icon-bar"></span>'
+'			</button>'
+'		</div>'
+'		<!-- Collect the nav links, forms, and other content for toggling -->'
+'		<nav class="collapse navbar-collapse" id="cfdict-navbar-collapse">'
+'			<ul class="menu nav navbar-nav">'
+'				<li><a href="./search.html"><i class="fa fa-search" alt="Dictionary"></i> Dictionary</a></li>'
+'				<li><a href="./hsk1.html"><i class="fa fa-graduation-cap" alt="HSK-1"></i> HSK-1</a></li>'
+'				<li><a href="./hsk2.html"><i class="fa fa-graduation-cap" alt="HSK-2"></i> HSK-2</a></li>'
+'				<li><a href="./hsk3.html"><i class="fa fa-graduation-cap" alt="HSK-3"></i> HSK-3</a></li>'
+'				<li><a href="./next.html"><i class="fa fa-rocket" alt="Next"></i> Good to learn</a></li>'
+'				<li><a href="./favorite.html"><i class="fa fa-star" alt="Favorite"></i> Favorite</a></li>'
+'				<li><a href="./learned.html"><i class="fa fa-check" alt="Learned"></i> Learned</a></li>'
+'				<li><a href="./about.html"><i class="fa fa-github" alt="Team!"></i> About</a></li>'
+'			</ul>'
+'		</nav>'
+'	</div>'
+'</nav>');
}

function appendJQMFooter(left, right) {
	$('footer').append(
		'<footer data-role="footer" data-theme="a" class="jqm-footer"><p>&copy;'+left+'!</p><p class="jqm-version">—'+right+'</p></footer>');
}

/* ############################################################################# */
/* ###############module: #####  2. UTILITIES   ################################ */
/* ############################################################################# */
var now = function() { return new Date(); };
var cl = function (message) { console.log(message);};
	cl.timer = function(array){
	for(var i=0; i<array.length -1;i++){ // ⟶⇒
		console.log("Period_"+i+"⟶"+(i+1)+" : "+(array[i+1]-array[i])/1000+"sec.");
	}
	console.log("Period_0⟶"+(array.length-1)+" : "+(array[array.length-1]-array[0])/1000+"sec.");
};
/* ############## UTILITIES ###################  */
/* META.Fn: timeStamp() 
 * def: create a timestamp with 17 digits military format
 * @o: date object, usually new Date()              --obj
 * @return: military date as YYYYMMDDhhmmsslll      --str */
var timeStamp = function(d) { // Date d
        var y = d.getUTCFullYear(),
            M = d.getUTCMonth() + 1,
            D = d.getUTCDate(),
            h = d.getUTCHours(),
            m = d.getUTCMinutes(),
            s = d.getUTCSeconds(),
            ms= d.getUTCMilliseconds();
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
    };

/* META.Fn: Shuffle 
 * @o: object to shuffle             --obj
 * @return: object shuffled         --obj */
var shuffle = function(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
/* META.Fn: Same (alternative to fn.Shuffle) 
 * @o: object                          --obj
 * @return: object                    --obj */
var same = function (o){ return o; };

/* META.fn: sortJSON
 * @object: object to sort                          --obj
 * @key: key to look at values to sort				--str
 * @way: way wanted out,  "123" or "321"			--str
 * @return: object sorted                           --obj */
var sortJSON = function (object, key, way) {
   data = object
            .sort(function(a, b) {  
                var x = a[key]; var y = b[key];
                if (way === '123') {return ((x < y) ? -1 : ((x > y) ? 1 : 0));}
                if (way === '321') {return ((x > y) ? -1 : ((x < y) ? 1 : 0));}
   });
    return data;
};
/* ############################################################################# */
/* ###############module: #####  2. L O A D I N G  ############################# */
/* ############################################################################# */
/* To store JSON in localStorage, you compress it as string */
// localStorage["results"] = JSON.stringify(jsonStatus); // or lS.restults
/* Whenever you want to work on it, need to uncompress the JSON */
// var json = JSON.parse(localStorage["results
/* ######################### DATA: ####################################  */
/* Meta.Fn: loadFileJson : load JSON from file at first run, else from localStorage thereafter
     * @url: url of data, http ok, local url : to test.     --str
     * @toLocalStorage: address to store/get data     --str
     * @return: data as object                                --obj
     * SYNTAXE:  var dict = loadJSONFile('https://codio.io/hugolpz/Cat-is-smart/data/dict.json', "dict"); */
var loadJSONFile = function(url, toLocalStorage) {
    var data;
    if (localStorage[toLocalStorage]) { 
        console.log("Good! Data already in locally!");
        data = JSON.parse(localStorage[toLocalStorage]);
    } 
    else { 
        $.getJSON(url, function (data) {
            console.log("NB: Data not yet loaded locally! ⇒  I loaded it!");
            // var data = addIndex(data, key1, key2); // comment this to stop indexing
            localStorage[toLocalStorage] = JSON.stringify(data);
            console.log("Data string: " + localStorage[toLocalStorage]);
        });
    }  return data;
};

/* Meta.Fn: saveObject : compress object into string, save persistantly in localStorage
     * @object: var name of object, as array, pair or value             --obj
     * @toLocalStorage: address to store data within localStorage		--str
     * SYNTAXE:  saveObject(knol, "knol") */
var saveObject = function (object, toLocalStorage) { 
    localStorage[toLocalStorage] = JSON.stringify(object);
    return object;
};

/* Meta.Fn: addIndexObject : compress object into string, save persistantly in localStorage : http://jsfiddle.net/n9pf6/2/
     * @object: var name of object                                 --obj
     * @key1: name of key in JSON which value should be index      --str
     * @key2: idem, to extend index's name                         --str
     * @return: object with suitable indexes                       --obj
     * SYNTAXE:  addIndex(dict, "ort", "pho"); */
var addIndex = function(object, key1, key2){
    var data = object, newData = {}, newIndex;
    for(var i in data){
        if(!key2){   newIndex = data[i][key1];  }
        else{          newIndex = data[i][key1]+ data[i][key2]; }
        newData[newIndex] = data[i];
    }    return newData;
};

/* ######################### TEMPLATING: UTILITIES: ####################################  */
/* ######################### STANDARDIZE NAMES: ####################################  */
/* ######################### STANDARDIZE NAMES: ####################################  */
/* ######################### STANDARDIZE NAMES: ####################################  */

/* META.fn: getList_Index                  http://hugolpz/WKcGr/   
 * :def: get the list of n next unkown lexies. Do: slice unknow, sort, slice n lexies, return zh keys
 *  @lSdata : localStorage variable storing up-to-date knol data as string, JSON.parse() run on it.
 * @n: number n of unknow lexies to get.                      --num
 * @status: 1 is unknow, 0.01 is unknow                       --num : 1 or 0.01
 * @returnKey: key to return as list, usually ort.           --str
 * @return: list of values, usually ort characters/words     --obj
 * @TODO: more parameters for: lexem length, date/historic, favorite.   < --------------------------------------------------------- Todo */
var filterArray = function (lSdata, n, keyOfFilter, valOfFilter) {      // < --------------------------------------------------------------------------- Add attributes
    var array = lSdata
   .filter(function (i) {
        return i[keyOfFilter] === valOfFilter ; //slice status=1 (condition)
    })/*
    .filter(function (i) {
        return i["zh"].length = 3; //slice 3 characters words only (condition)
    }) */
    // .sort(function (a, b) {
    //    return a[keyOfSorter] - b[keyOfSorter]; //sort 
    // })
    .slice(0, n); //top n entries
    return array;
};

var getArray_Keys = function(array, returnKey) { var list = array.map(function (i) { 
        return i[returnKey]; //return keys
    });
    return list; 
};
/* */
var filterArray_ifDuplicata = function(lSdata, n, keyOfFilter, listForFilters) { 
	var array=[];
	for(var i in listForFilters){ 
		var target = filterArray(lSdata, n, keyOfFilter, listForFilters[i]);
		for (var j=0; j<target.length;j++) { 
			var k = array.length;
			array[k] = target[j]; // array.push(target[j])
		}
	} 
	return array;
};

/* META.fn: getList_Item    /!\ WRITE UPON DUPLICATA (same key)
 * :def: from a list of idexes/items, return array of objects respecting this filter
 * @objectplus: dictionary object with indexes				--obj
 * @list: lexies to get.                                    --obj
 * @key: key used as filter, usually ort.					--str
 * @return: list of values, usually ort characters/words	--obj */
var getList_Item = function (objectplus, list, key) { 
    var data=objectplus, newData = {};
    for (var i=0; i<list.length; i++) {
            var lexeme = list[i]; // "火山口";
            newData[lexeme] = data[lexeme]; //will write upon /!\
        }  return newData;
};


/* META.fn: stringifyArray    http://jsfiddle.net/UJ3NX/3/
 * :def: buil a valid API request url from core API url, array of values & separators
 * @api: root url of the api to request 					--str
 * @array: list of values  									--obj
 * @separator: separator to be added 						--str
 * @return: api url + string of values & serparators 		--str  */
var buildUrlAPI = function (api, array, separator){
    var newList= array[0]+"";
    for(i=1; i<list.length; i++){
        newList = newList+separator+array[i];
    } return api+newList;
};


/* ######################### TEMPLATING: PROJECTION ####################################  */
/* META.fn: injectTPL (mustache). See: /hugolpz/WKcGr/ */ 
// :def: inject the items within the body's anchor
// @"url": str of url for json dictionary, relative or absolute
// @list: var-object of keys for items to display
// @"tplId": str of html id of js template within the html page
// @"anchor": str of html id of the html anchor/container to receive the items.
var injectTPL = function (dataOrUrl, list, $tpl, $hook, indexed, callback) {
    console.log("Handlebars TPL = Fired !");
    var data = dataOrUrl;
	var missing = [];
//    function(data) {
    if($.type(data) === "string" && indexed === true){
        $.getJSON(dataOrUrl, function(data) {
            for (var i=0; i<list.length; i++) {
                var lexeme = list[i]; // "火山口";
                var template = $($tpl).html() ;
                var stone = Handlebars.compile(template)(data[lexeme]);
                $($hook).append(stone);
            }  callback();  // Invoke our own callback.
        });
    }
    else if($.type(data)=== "object" && indexed === true)   { // index
        for (var i=0; i<list.length; i++) {
            if(data[list[i]]){ // so empty dict entry don't break the code
            	var lexeme = list[i]; // "火山口";
            	var template = $($tpl).html() ;
                var stone = Handlebars.compile(template)(data[lexeme]);
                $($hook).append(stone);
            }
        }
    }
    else{ // no index
        for (var j in list) {
            for(var k=0; k<data.length; k++){
            	if (data[k]["ort"] === list[j] && data[k]) {  // 2nd so empty dict entry don't break the code
					var lexeme = list[j]; // "火山口";
					var template = $($tpl).html();
					var stone = Handlebars.compile(template)(data[k]);
					$($hook).append(stone);
					break;
		       	}else if(k === data.length -1 && data[k]["ort"] !== list[j]){ missing.push(list[j]); }
        	}
        }
    }
	console.log("Dictionary, missing: "+JSON.stringify(missing))
};

/* ############################################################################# */
/* ###############module: #####  3.  M O N I T O R I N G  ###################### */
/* ############################################################################# */

//META.Fn: getVal
var getJsonValue = function (json, key, item) {
    for (var i in json) {
        if (json[i][key] === item) {
            return json[i]; //.rank
            break;
        }
    }
};
//META.Fn: pushVal.status
var pushJsonVal = function (json, keyToFilter, item, keyToWrite, val) {
    for (var i in json) {
        if (json[i][keyToFilter] === item) {
            json[i][keyToWrite] = val;  // PUSH SOMETHING
            break;
        }
    } return json;
};

var getJsonVal = function(json, item) { return getJsonValue(json, "ort", item); }; // <-------- replace all getJsonVal by getJsonVal_zh
var setJsonStatus = function(json, item, val) { pushJsonVal(json, 'ort', item, 'status', val  ); };
var setJsonK_Date = function(json, item) { pushJsonVal(json, 'ort', item, 'k_date', timeStamp( new Date())  ); };
var setJsonScore = function(json, item) { pushJsonVal(json, 'ort', item, 'score', calScoreItem(json, item) ); };
var setJsonFavorite = function(json, item, val) { pushJsonVal(json, 'ort', item, 'favorite', val); };
var setJsonF_Date = function(json, item) { pushJsonVal(json, 'ort', item, 'f_date', timeStamp( new Date())  ); };

//META.Fn: update all scores
var updateJsonScores = function (object) {
    for (var j in object) {
        if (!object[j].k_date) { object[j].k_date = 0; }
        if (!object[j].favorite) { object[j].favorite = 0; }
        if (!object[j].f_date) { object[j].f_date = 0; }
        object[j].score = calScoreItem(object, object[j].ort);
    } return object;
};

// META.fn: Find list of items to update
// ex: update_items_from_list(knol, "ort", $this.data("ort") )
var find_items_with_pattern = function (arr, key, pattern_str) {
 var out = [];
  for (var i in arr) {
    if (arr[i][key].indexOf(pattern_str) > -1) {
		out.push({'i': i, 'ort':arr[i][key]});
    }
  } return out;	
};

// META.fn: Update scores for list of items
//  ex: update_items_from_list(knol, list)
var update_items_from_list = function (json, arr) {
  for (var i in arr) {
	var lexeme = json[arr[i]["i"]]["ort"]; // or arr[i]["ort"]
	setJsonScore(json, lexeme);
//   json[arr["i"]]["score"] = calScoreItem(json, lexeme)
	console.log("S++: "+ lexeme +"; "+ JSON.stringify(  getJsonVal(json, lexeme)  ) );// edited
  }
};

/* ############################################################################# */
/* ###############module: #####  4.  S C O R I N G  ###################### */
/* ############################################################################# */

// 2. Mass of item (ci) = Imass = IfRank * Istatus * [ ∑ (CfRank * Cstatus)]
var calScoreItem  = function (json, item) {  // 0. Mass of one zi
    var mass =  getJsonVal(json, item).status
    * getJsonVal(json, item).rank 
    * calScoreSumRoots (json, item); // <-------------------- Formula (full mass)
    //console.log("Word mass = " + mass);
    mass = Math.round(mass*1000)/1000;
    return mass;
};

//META.Fn: pushVal.score /RBSC9/9/
// 1. Mass of components (zis):
var chineseWordRoots = function(word){ return word.split(""); };
var calScoreRoot = function (json, root) {  // 0. Mass of one zi
   var value = getJsonVal(json, root);
    if(value) {   return value.status * value.rank; }
    else{
        // push {"ort": +root+,"status":1,"rank":20000,"score":null},
        return 1*20000;
    }
};
var calScoreSumRoots = function (json, word) {  
    var roots =  chineseWordRoots(word);
    var sum = 0;
    for (var i in roots) {
        //console.log(itemId+"["+i+"] = " + roots[i]);
        sum = sum + calScoreRoot(json, roots[i]); // <-------- Formula (components mass)
        //console.log("sum = " + sum + "(i:" + i + ")");
        i = i + 1;
    }
    return sum;
};


/* ############################################################################# */
/* ###############module: #####  5.  CSS UPDATE or SWITCH   ############################ */
/* ############################################################################# */

/* META.Fn: loadSwitch [localStorage  => CSS]
 * def: According to data, set the HTML data attributes and thus CSS of elements
 * @object: dictionary of values                                    --obj
 * @$item: CSS selector of your target HTML elements      --str */
var setLexemeCss = function (object, $item) {
   $item.each(function a(i) {
        var lexeme = $(this).data('ort');
        var val = getJsonVal(object, lexeme);
		//console.log(lexeme+": "+ JSON.stringify(val));
		if(val===undefined){ 
			val = { "rank":20000,"status":1,"score":100000000,"k_date":0,"favorite":0,"f_date":0}; 
			val.ort= lexeme;
			// val.score = 
			object.push(val);
		}
		//console.log(lexeme+": "+ JSON.stringify(val));
		var visualStatus = "bd-neutral";
		if(!val.status || val.status===1 ){ val.status = 1; }else{visualStatus = "bg-success bd-success";}
		if(!val.favorite){ val.favorite = 0;}
        //setTimeout(function () {
        $(this).attr("data-status", val.status) //.attr("data-knol", JSON.stringify(val)); // data("favorite", val.favorite)
            .attr("data-k_date", val.k_date)
            .attr("data-score", val.score)
			.attr("data-favorite", val.favorite)
            .attr("data-f_date", val.f_date);
		$(this).removeClass( "bg-success bg-info bg-warning bg-danger  bd-success bd-info bd-warning bd-danger" )
			.addClass( visualStatus );
        // }, 1000);
    });
};
    
//META.Fn: clickSwitch [localStorage & CSS]
var switchStatus = function (object, $this) {
    var lexeme = $this.attr("data-ort");
    var value = $this.attr("data-status"); //pull
    if (value === "1" || !value) { // update storage and CSS
        setJsonStatus(object, lexeme, 0.01); //push
        setJsonK_Date(object, lexeme);       //push
        setJsonScore(object, lexeme);        //push
    } else { // (mirror)
        setJsonStatus(object, lexeme, 1); //push
        setJsonK_Date(object, lexeme);    //push                
        setJsonScore(object, lexeme);     //push
    }
	console.log("S+: "+ lexeme +"; val: " + JSON.stringify(value) +": "+ JSON.stringify(  getJsonVal(object, lexeme)  ) );// edited
}; // end

var switchFavorite = function (object, $this) {
    var lexeme = $this.attr("data-ort");
    var value = $this.attr("data-favorite"); //pull
    if (value === "0" || !value) { // update storage and CSS
        setJsonFavorite(object, lexeme, 1); //push
        setJsonF_Date(object, lexeme); //push
    } else { // (mirror)
        setJsonFavorite(object, lexeme, 0); //push
        setJsonF_Date(object, lexeme); //push
    }
	console.log("F+: "+ lexeme +"; val: " + JSON.stringify(value) +": "+ JSON.stringify(  getJsonVal(object, lexeme)  ) );// edited
 }; // end

/* ############################################################################# */
/* ###############module: #####   6. A U D I O S  ###################### */
/* ############################################################################# */

var playSound = function ($this) {
	// get phonetic properties
    var ort = $this.attr("data-ort");
    var pho = $this.attr("data-pho").replace("5", "1"); //pull
	var key = function() { if( ort.length == 1) { return "syllabs/cmn-"+pho; } else { return "hsk/cmn-"+ort; } };
	var urls= ['../audio/cmn/64k/'+key()+'.mp3'];
	// var gurls= ['//translate.google.com/translate_tts?tl=zh-cn&q="'+ort+'"'];
	$this.addClass("playing");

	// HTML5 Audio > HowlerJS
//    if (typeof Audio != "undefined") { 
	var sound = new Howl({
		urls: urls,
	//	format: "mp3",
	//	buffer: true,
		onend: function() {$this.removeClass("playing");}
	});
	sound.play();

    // ELSE > Phonegap media
	// src: http://stackoverflow.com/a/15598186/1974961
/*    } else if (typeof device != "undefined") {
		var media = new Media(urls);
		media.play();
	} */
//	play_sounds(urls, $this);
	// $this.find("audio")[0].play(); // with <audio src="../cmn/audio/cmn-{{pho}}.mp3"></audio>
	console.log("♪+:ort: "+ ort +" ; pho: " +pho+" ; key: "+key() );// edited
}; // end	


// PLAY_SOUNDS is NOT USED
var play_sounds = function(array_of_audio_urls, $this) {
    // initialisation:
    var onPlay = [false],  // this one is useless now
      pCount = 0;
      /* playlistUrls = [
        "./audio/cmn-ni3.mp3",
        "./audio/cmn-hao3.mp3",
        "./audio/cmn-lao3.mp3",
        "./audio/cmn-mao3.mp3"
        ]; // audio list */
     var howlerBank = [], // var ????
      loop = true;

    // playing i+1 audio (= chaining audio files)
    var onEnd = function(e) {
		if (loop === true ) { pCount = (pCount + 1 !== howlerBank.length)? pCount + 1 : 0; }
		else { pCount = pCount + 1; }
		$this.removeClass("playing text-success");
		howlerBank[pCount].play();
    };

    // build up howlerBank:     
    array_of_audio_urls.forEach(function(current, i) {   
      howlerBank.push(new Howl({ urls: [array_of_audio_urls[i]], onend: onEnd, buffer: true }));
    });

    // initiate the whole :
	howlerBank[0].play();
};




//
var add_interaction_hsk_app = function(){
	// KNOL
	$(".tpl .knol").click(function(){ //var sL_s = now(); 
		// cl( "K-test_1: "+JSON.stringify(knol));
		// $(this).closest(".tpl").attr("data-status")
		switchStatus(knol, $(this).closest(".tpl") );   // edit data  
		setLexemeCss(knol, $(this).closest(".tpl") );    // update screen
		var impacted = find_items_with_pattern(knol, "ort", $(this).closest(".tpl").attr("data-ort") );
		update_items_from_list(knol, impacted);
		knol = saveObject(knol, "knol" );	
		//	 cl( "K-test_2: "+JSON.stringify(knol));
	});
	// FAVORITE
	$(".tpl .favorite").click(function(){
		switchFavorite(knol, $(this).closest(".tpl") ); // edit data  
		setLexemeCss(knol, $(this).closest(".tpl")   ); // update screen
		knol = saveObject(knol, "knol" ); 				 // persistant save (obj, lS)
	});
	// SOUND
	$(".tpl .sound").click(function(){ 
		playSound( $(this).closest(".tpl") );
	});	
};
	
/* *********** END ********** */
