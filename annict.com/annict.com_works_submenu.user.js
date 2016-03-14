// ==UserScript==
// @name        Annict シーズン別表示
// @description Annict PC版レイアウトで「今期のアニメ」のサブメニューを追加します。
// @namespace   imatake.github.io
// @include     https://annict.com/*
// @author      imatake
// @version     1.00.20160314
// @license     MIT License
// @icon        data:image/gif;base64,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
// @grant       none
// ==/UserScript==
(function () {
  var obj = $('div.ann-navbar');
  if (obj && obj.length > 0) {
    var navbar = obj[0];
    obj = $('div.left>ul', navbar);
    if (obj && obj.length > 0) {
      // メニュー
      var left = obj[0];
      left.style = 'height: 100%;'; // Firefox用に高さを広げる
      // 今期のアニメ
      var works = left.children[2];
      works.className = 'dropdown'; // ドロップダウンのCSS指定
      // 今期のアニメのサブメニュー枠
      var worksSub = document.createElement('ul');
      worksSub.className = 'menu';
      works.appendChild(worksSub);
      // 今期のアニメのサブメニュー追加
      worksSub.appendChild(createNavbarDropdownItem('/works/2016-spring', '来期のアニメ'));
      worksSub.appendChild(createNavbarDropdownItem('/works/2015-autumn', '前期のアニメ'));
      worksSub.appendChild(createNavbarDropdownItem('/works/popular', 'すべて(人気)'));
    }
  }
  // ドロップダウンのサブメニュー追加関数
  function createNavbarDropdownItem(url, name) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = url
    link.innerHTML = name;
    item.appendChild(link);
    return item;
  }
}) ();
