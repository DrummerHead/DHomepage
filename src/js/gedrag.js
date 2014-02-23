(function(){
'use strict'




// Helper function
//
var $ = function(element){
  return Array.prototype.slice.call(document.querySelectorAll(element));
}


// Fetch elements
//
var $search = $('.search');
var $searchForms = $('.search form');


// List of engines and replacement functions
//
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


// Get a jQuery object and return a url related to its attributes
//
var getUrl = function(el){
  var id = el.id;
  if(id in engines){
    var query = el.querySelector('input').value;
    var modAlpha = el.querySelector('.modAlpha') ? el.querySelector('.modAlpha').checked : undefined;
    var modBeta = el.querySelector('.modBeta') ? el.querySelector('.modBeta').checked : undefined;

    return engines[id](encodeURIComponent(query), modAlpha, modBeta);
  }
  return undefined
};


$searchForms.forEach(function(el, i, array){
  if(el.getAttribute('class') !== 'native'){
    // Bind form submit to go to url
    //
    el.addEventListener('submit', function(event){
      event.preventDefault();
      window.location.href = getUrl(this)
    }, false);


    // Bind get button click to returning the url value in place
    //
    el.querySelector('.get').addEventListener('click', function(event){
      event.preventDefault();
      $searchForms[i].querySelector('input').value = getUrl($searchForms[i]);
    }, false);
  }


  // Bind focusing on an input element to that element enlarging
  // Also select all the text by default for easier rewrite
  //
  el.querySelector('input').addEventListener('focus', function(event){
    $search[i].classList.toggle('shrink', false);
    $search[i].classList.toggle('focus', true);

    var brotherIndex = i % 2 == 0 ? i + 1 : i - 1;

    $search[brotherIndex].classList.toggle('shrink', true);
    $search[brotherIndex].classList.toggle('focus', false);

    this.select();
  }, false);


  // Bind going away of an element to all elements returning to normal
  //
  el.querySelector('input').addEventListener('blur', function(event){
    $search.forEach(function(_el, _i, _array){
      $search[_i].classList.toggle('shrink', false);
      $search[_i].classList.toggle('focus', false);
    });
  }, false);
});




})();
