// ==UserScript==
// @name        Annict 放送予定表示 V2
// @description Annict の放送予定ページで放送前の表示色を変更します。また、放送予定の表示範囲を抑制します。
// @namespace   imatake.github.io
// @include     https://annict.com/programs
// @author      imatake
// @version     1.00.20160616
// @license     MIT License
// @grant       none
// ==/UserScript==
(function () {
  // 放送前のスタイルを変更する（スタイルシートを埋め込み）
  var css = '/* 放送前のスタイルを変更 */' + `
body.programs-index .a-content .a-programs .a-program-container.unbroadcasted .a-program .a-header .a-started-at {
  color: #228B22;
}
body.programs-index .a-content .a-programs .a-program-container.unbroadcasted .a-progress .a-line {
  border-color: #228B22;
}
body.programs-index .a-content .a-programs .a-program-container.unbroadcasted .a-progress .a-line .a-point {
  background-color: #228B22;
}
`;
  var head = document.querySelector('head');
  if (head) {
    var style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
}) ();
// -----
(function () {
  // 放送予定の表示範囲設定
  document.body.addEventListener('load', function (e) {
    var now_dt = new Date();
    // 非表示とする放送予定の時刻(通算ミリ秒, now_dt.getTime() + 12 * 60 * 60 * 1000 で現在時刻より12時間前)
    var hidden_dt = new Date(now_dt.getTime() + 12 * 60 * 60 * 1000);
    // ---------- ----------
    $('div.a-program-container').each(function () {
      var started_at = $(this).find('span.a-started-at') [0];
      //console.info(started_at);
      var started_at_obj = new Date('2016/' + started_at.textContent);
      if (started_at_obj > hidden_dt) this.style = 'display: none;';
    });
  }, true);
}) ();
// -----
(function () {
  // 放送予定の表示範囲の選択
  var sort_selector = null;
  document.body.addEventListener('load', function (e) {
    if (!sort_selector) {
      sort_selector = $('div.a-sort-selector') [0];
      //console.info(sort_selector);
      sort_selector.appendChild(document.createTextNode(' '));
      //var time_selector = document.createElement('div');
      //time_selector.className = 'a-time-selector column small-12 medium-8 text-right';
      //time_selector.style = 'margin: 14px 0; padding-right: 0; float: right;';
      var time_select = document.createElement('select');
      sort_selector.appendChild(time_select);
      //
      time_select.appendChild(createOptionItem('放送済みのみ', 'time_period_none', false));
      time_select.appendChild(createOptionItem('12時間以内まで', 'time_period_half', true));
      time_select.appendChild(createOptionItem('1日(24時間)まで', 'time_period_1day', false));
      time_select.appendChild(createOptionItem('2日(48時間)まで', 'time_period_2day', false));
      time_select.appendChild(createOptionItem('3日(72時間)まで', 'time_period_3day', false));
      //time_select.appendChild(createOptionItem('1週間', 'time_period_1week', false));
    }
  }, true);
  function createOptionItem(name, value, selected) {
    var opt = document.createElement('option');
    opt.textContent = name;
    opt.setAttribute('value', value);
    if (selected) opt.setAttribute('selected', 'selected');
    return opt;
  }
}) ();