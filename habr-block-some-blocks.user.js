﻿// ==UserScript==
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
// @namespace   http://habr.com
// @include     http://habr.com/post/*
// @include     http://habr.com/company/*
// @include     http://habr.com/article/*
// @include     http://geektimes.com/post/*
// @include     http://geektimes.com/company/*
// @include     http://geektimes.com/article/*
// @include     https://habr.com/post/*
// @include     https://habr.com/company/*
// @include     https://habr.com/article/*
// @include     https://geektimes.com/post/*
// @include     https://geektimes.com/company/*
// @include     https://geektimes.com/article/*
// @grant       none
// @run-at      document-start
// @version     0.5.1
// @downloadURL https://bitbucket.org/liiws/habr-block-some-blocks/downloads/habr-block-some-blocks.user.js
// @updateURL   https://bitbucket.org/liiws/habr-block-some-blocks/downloads/habr-block-some-blocks.meta.js
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

  // bottom shit - interesting articles
  $(".default-block__header-title:contains('Интересные публикации')").closest(".default-block").remove();
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