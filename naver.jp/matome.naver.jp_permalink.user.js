// ==UserScript==
// @name        NAVER まとめ ページリンク変更
// @description NAVER まとめ のページリンクをパーマリンクにする
// @namespace   imatake.github.io
// @include     http://matome.naver.jp/odai/*
// @author      imatake
// @version     1.00.2050825
// @license     MIT License
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==
(function () {
  var re = /goPage\((\d+)\);/;
  $('div.MdPagination03 a').each(function () {
    //console.info(this);
    var m = re.exec(this.onclick);
    if (m) {
      this.href = '?page=' + m[1];
    }
  });
}) ();
