// ==UserScript==
// @name        Annict 放送予定表示 V2
// @description Annict の放送予定ページで放送前の表示色を変更します。また、放送予定の表示範囲を抑制します。
// @namespace   imatake.github.io
// @include     https://annict.com/programs
// @author      imatake
// @version     1.00.20160926
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
  document.body.addEventListener('load', showProgramEvent, true);
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
      time_select.id = 'a-time-selector';
      time_select.addEventListener('change', showProgramEvent, true);
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
  } //
  // 放送予定の表示範囲設定
  function showProgramEvent() {
    var hidden_msec = 12 * 60 * 60 * 1000;
    var time_select = $('#a-time-selector');
    //console.info(time_select);
    if (time_select && time_select.length > 0) {
      var time_select_value = time_select[0].value;
      //console.info(time_select_value);
      switch (time_select_value) {
        case 'time_period_none':
          hidden_msec = 0;
          break;
        case 'time_period_half':
          hidden_msec = 12 * 60 * 60 * 1000;
          break;
        case 'time_period_1day':
          hidden_msec = 24 * 60 * 60 * 1000;
          break;
        case 'time_period_2day':
          hidden_msec = 48 * 60 * 60 * 1000;
          break;
        case 'time_period_3day':
          hidden_msec = 72 * 60 * 60 * 1000;
          break;
        case 'time_period_1week':
          hidden_msec = 7 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    var now_dt = new Date();
    // 非表示とする放送予定の時刻(通算ミリ秒, now_dt.getTime() + 12 * 60 * 60 * 1000 で現在時刻より12時間前)
    var hidden_dt = new Date(now_dt.getTime() + hidden_msec);
    // 放送中と判断する時刻(通算ミリ秒, now_dt.getTime() - 30 * 60 * 1000 で現在時刻より30分前)
    var before_dt = new Date(now_dt.getTime() - 30 * 60 * 1000);
    //console.info(hidden_dt);
    // ---------- ----------
    $('div.a-program-container').each(function () {
      var started_at = $(this).find('span.a-started-at') [0];
      //console.info(started_at);
      this.style.display = '';
      var started_at_obj = new Date('2016/' + started_at.textContent);
      // 指定範囲外の非表示
      if (started_at_obj > hidden_dt) this.style.display = 'none';
      // 放送中の表示
      if (now_dt > started_at_obj && started_at_obj > before_dt) {
        $(this).find('div.a-line') [0].style = 'border-color: #87CEEB';
        $(this).find('div.a-point') [0].style = 'background-color: #87CEEB';
      }
    });
  }
}) ();
