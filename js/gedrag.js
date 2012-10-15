$(function(){




var $inputs = $('input')


$inputs.val('').focus(function(){
  $(this).select();
});


var engines = {
  g : function(q, modAlpha) {
    return 'https://www.google.com/search?q=' + q + '&safe=off&pws=0&nfpr=1' + (modAlpha ? '&hl=es' : '');
  },
  gi : function(q, modAlpha, modBeta) {
    return 'https://www.google.com/search?q=' + q + '&tbm=isch&safe=off&pws=0&nfpr=1' + (modAlpha || modBeta ? '&tbs=' : '') + (modAlpha ? 'imgo:1,' : '') + (modBeta ? 'ift:gif,' : '');
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


var makeUrl = function(q, id, modAlpha, modBeta){
  var safeUrl = q
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/&/g, '%26')
    .replace(/\+/g, '%2B')
    .replace(/\?/g, '%3F')
    .replace(/[ _]+/g, '+');
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
