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
// @version     0.1
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
  $(".similar-posts.similar-posts_full").remove();
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

});