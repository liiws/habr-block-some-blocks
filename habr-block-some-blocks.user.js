// ==UserScript==
// @name        habr-block-some-blocks
// @namespace   http://habrahabr.ru
// @include     http://habrahabr.ru/post/*
// @include     http://habrahabr.ru/company/*
// @include     http://habrahabr.ru/article/*
// @include     http://geektimes.ru/post/*
// @include     http://geektimes.ru/company/*
// @include     http://geektimes.ru/article/*
// @include     https://habrahabr.ru/post/*
// @include     https://habrahabr.ru/company/*
// @include     https://habrahabr.ru/article/*
// @include     https://geektimes.ru/post/*
// @include     https://geektimes.ru/company/*
// @include     https://geektimes.ru/article/*
// @grant       none
// @run-at      document-start
// @version     0.2
// @downloadURL https://bitbucket.org/liiws/habr-best-comments/downloads/habr-block-some-blocks.user.js
// @updateURL   https://bitbucket.org/liiws/habr-best-comments/downloads/habr-block-some-blocks.meta.js
// ==/UserScript==


// fix blocked broken ads
(function(){
	var wnd = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
	if (typeof wnd.adriver == "undefined") {
		wnd.adriver = function () { };
	}
})();


window.addEventListener('load', function () {
  
  // similar articles
  $(".similar-posts").remove();
  $(".live-broadcast").remove();

  // allow ads recomendation
  $(".html_banner_wrap").remove();
  $(".xyz_wrapper.js-ad_sticky_bottom").remove();
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.sidebar_right .wrapper-sticky, .xyz_wrapper { display: none !important; }';
  document.getElementsByTagName('head')[0].appendChild(style);

  // interesting articles
  $(".live-broadcast.live-broadcast_feed").remove();

  // company widgets
  $(".company_widgets").remove();
  
  // dronk.ru
  var mainLink = $("a > img[src='https://habrastorage.org/getpro/geektimes/post_images/a21/7b2/4d4/a217b24d43f7add28412427e5ce9e54b.png']").parent();
  if (mainLink.length > 0) {
    var elemsToDelete = [ mainLink[0] ];
    var isHrFound = false;
    var nextElem = mainLink[0];
    for (var i = 0; i < 15 && nextElem != null; i++) {
      nextElem = nextElem.previousSibling;
      elemsToDelete.push(nextElem);
      if (nextElem.nodeName == "HR") {
        isHrFound = true;
        break;
      }
    }
    if (!isHrFound) {
      var elemsToDelete = [ mainLink[0] ];
    }
    nextElem = mainLink[0];
    while ((nextElem = nextElem.nextSibling) != null) {
      elemsToDelete.push(nextElem);
    }
    elemsToDelete.map(function(item){ $(item).remove(); });
  }
  
});
