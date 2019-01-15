// ==UserScript==
// @name        habr-block-some-blocks
// @namespace   http://habr.com
// @include     https://habr.com/ru/post/*
// @include     https://habr.com/ru/company/*
// @include     https://habr.com/ru/article/*
// @include     https://habr.com/en/post/*
// @include     https://habr.com/en/company/*
// @include     https://habr.com/en/article/*
// @grant       none
// @run-at      document-start
// @version     0.5.2
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
  
  // similar and most read
  var elem;
  while ((elem = $(".post-additionals").next(".default-block")).length > 0) {
    elem.remove();
  }
  
  // blank ads holder
  $(".dfp-slot").remove();

  // bottom shit
  $(".default-block__header-title:contains('Интересные публикации')").closest(".default-block").remove();
  $(".default-block__header-title:contains('Самое читаемое')").closest(".default-block").remove();
  $(".default-block__header-title:contains('Top posts')").closest(".default-block").remove();
  // other
  $(".promo-block__header").closest(".default-block_content").remove();
  
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