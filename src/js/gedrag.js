$(function(){




var $inputs = $('input')


$inputs.val('').focus(function(){
  $(this).select();
});


var engines = {
  google : function(query, modAlpha, modBeta) {
    return 'https://www.google.com/search?q=' + query + '&safe=off&pws=0&nfpr=1' + (modAlpha ? '&cr=countryUY' : '') + (modBeta ? '&hl=es' : '');
  },
  googleImages : function(query, modAlpha, modBeta) {
    return 'https://www.google.com/search?q=' + query + '&tbm=isch&safe=off&pws=0&nfpr=1' + (modAlpha || modBeta ? '&tbs=' : '') + (modAlpha ? 'imgo:1,' : '') + (modBeta ? 'ift:gif' : '');
  },
  duckDuckGo : function(query) {
    return 'http://duckduckgo.com/?q=' + query;
  },
  youtube : function(query) {
    return 'http://www.youtube.com/results?search_query=' + query;
  },
  bingImages : function(query) {
    return 'http://www.bing.com/images/search?q=' + query;
  },
  imgur : function(query) {
    return 'http://imgur.com/gallery?q=' + query;
  },
}


var makeUrl = function(query, id, modAlpha, modBeta){
  var safeUrl = query
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/&/g, '%26')
    .replace(/\+/g, '%2B')
    .replace(/\?/g, '%3F')
    .replace(/[ ]+/g, '+');
  var urlResult = engines[id](safeUrl, modAlpha, modBeta);

  return urlResult;
}


var collector = function(selected){
  var fId = selected.attr('id');
  var query = selected.find('input[type="text"]').val();
  var modAlpha = selected.find('.modAlpha:checked').length;
  var modBeta = selected.find('.modBeta:checked').length;

  return makeUrl(query, fId, modAlpha, modBeta);
}


$('.search').on('submit', 'form:not(".native")', function(i){
  i.preventDefault();
  window.location.href = collector($(this));
});


$('.search').on('click', '.get', function(i){
  var $jug = $(this).parents('form');
  var stringo = collector($jug);
  $jug.find('input').val(stringo);
});


$('.search').on('focus', 'input[type="text"]', function(i){
  var $jug = $(this).parents('li');
  var side = $jug.data('side');
  var $brother;

  $jug.removeClass('shrink').addClass('focus');

  if(side == 'left'){
    var $brother = $jug.next();
  }
  else if(side == 'right'){
    var $brother = $jug.prev();
  }

  $brother.removeClass('focus').addClass('shrink');
});


$('.search').on('blur', 'input[type="text"]', function(i){
  var $jug = $(this).parents('li');
  var side = $jug.data('side');
  var $brother;

  if(side == 'left'){
    var $brother = $jug.next();
  }
  else if(side == 'right'){
    var $brother = $jug.prev();
  }

  $jug.removeClass('shrink focus');
  $brother.removeClass('shrink focus');
});




});
