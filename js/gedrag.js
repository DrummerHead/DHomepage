$(function(){




var $forms = $('form')
  , $inputs = $('input')
  , query
  , fId

$inputs.focus(function(){
  $(this).select();
});

var engines = {
  g : function(q) {
    return 'https://www.google.com/search?q=' + q + '&safe=off&pws=0';
  },
  gi : function(q) {
    return 'https://www.google.com/search?q=' + q + '&tbm=isch&safe=off&pws=0';
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

var makeUrl = function(q, id){
  var safeUrl = q
        .replace(/&/g, '%26')
        .replace(/ /g, '+')
    , urlResult = engines[id](safeUrl)

  return urlResult;
}

var collector = function(selected){
  var query = selected.find('input').val()
    , fId = selected.attr('id')

  return makeUrl(query, fId);
}

$('.search').on('submit', 'form', function(i){
  i.preventDefault();
  window.location.href = collector($(this));
});

$('.search').on('click', '.get', function(i){
  var $jug = $(this).parents('form')
    , stringo = collector($jug)
  $jug.find('input').val(stringo);
});




});
