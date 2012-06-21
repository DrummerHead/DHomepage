$(function(){




var $inputs = $('input')


$inputs.val('').focus(function(){
  $(this).select();
});


var engines = {
  g : function(q, mod) {
    return 'https://www.google.com/search?q=' + q + '&safe=off&pws=0' + (mod ? '&hl=es' : '');
  },
  gi : function(q, mod) {
    return 'https://www.google.com/search?q=' + q + '&tbm=isch&safe=off&pws=0' + (mod ? '&tbs=imgo:1' : '');
  },
  d : function(q) {
    return 'http://duckduckgo.com/?q=' + q;
  },
  y : function(q) {
    return 'http://www.youtube.com/results?search_query=' + q;
  },
  i : function(q) {
    return 'http://imgur.com/gallery?q=' + q;
  },
  ig : function(q) {
    return 'https://www.google.com/search?q=site:http://imgur.com/+' + q + '&safe=off&pws=0';
  }
}


var makeUrl = function(q, id, mod){
  var safeUrl = q
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/&/g, '%26')
        .replace(/\+/g, '%2B')
        .replace(/\?/g, '%3F')
        .replace(/ /g, '+')
    , urlResult = engines[id](safeUrl, mod)

  return urlResult;
}


var collector = function(selected){
  var fId = selected.attr('id')
    , query = selected.find('input[type="text"]').val()
    , mod = selected.find('input[type="checkbox"]:checked').length

  return makeUrl(query, fId, mod);
}


$('.search').on('submit', 'form:not(".native")', function(i){
  i.preventDefault();
  window.location.href = collector($(this));
});


$('.search').on('click', '.get', function(i){
  var $jug = $(this).parents('form')
    , stringo = collector($jug)
  $jug.find('input').val(stringo);
});




});
