/* ######################### TEMPLATING: PROJECTION ####################################  */
/* META.fn: injectTPL (mustache). See: /hugolpz/WKcGr/ */ 
// :def: inject the items within the body's anchor
// @url: url of json dictionary
// @list: list (object) of keys for items to display
// @tplId: html id of js template within the html page
// @anchor: html id of the html anchor/container to receive the items.
function injectTPL(url, list, tplId, anchor) {
    $.getJSON(url, function(data) {
        for (var i=0; i<list.length; i++) {
            var lexeme = list[i]; // "火山口";
            var template = '{{#CFDICT}}{{#'+ lexeme +'}}' + $(tplId).html() + '{{/'+ lexeme +'}}{{/CFDICT}}';
            var info = Mustache.to_html(template, data);
            $(anchor).append(info);
        }
    });
}

/* META.fn: injectTPL (JS tpl)*/
var ziNext50 = ['火', '的', '山', '首', '页', '鍺', '是', '一', '種', '化', '學', '元', '素', '符', '號', '是', '原', '子', '序', '數', '是', '它', '是', '一', '口']

//
function injectTpls (data, anchor, datakey) {
    for (var i in data) {
        $(anchor).append('<button class="btn" lexeme="'+datakey[i]+'">.'+datakey[i]+'</button>');
        i = i+1;
    }
}

/* META.fn: injectTPL (html tpl)*/
function inject2 (data, datakey, tplID, anchor) {
    for (var i in data) {
        template = $(tplID).html();
        $(anchor).append(template);
        i = i+1;
    }
}
tpl = $('#CFDICT-template').html();
inject2  (data, tpl, '#container2');

// TPLS2
function injectTpls2(list, tplId, $containerId){
    for (var i in list) {
        $containerId.append("$('#"+tplId+"').text()");
        i = i+1;
    }
}

var list = ziNext50;
var tpl = '<button lexeme="'+list[i]+'">'+list[i]+'</button>';
injectTpls(list, tpl, $("#container"));
/*      ____________________________________________________________         */