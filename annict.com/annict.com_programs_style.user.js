// ==UserScript==
// @name        Annict 放送予定表示 V3
// @description Annict の放送予定ページで放送前の表示色を変更します。また、放送予定の表示範囲を抑制します。
// @namespace   imatake.github.io
// @include     https://annict.com/programs
// @author      imatake
// @version     3.00.20170323
// @license     MIT License
// @grant       none
// ==/UserScript==
(function () {
  // 放送前のスタイルを変更する（スタイルシートを埋め込み）
  var css = '/* 放送前のスタイルを変更 */' + `
body.p-programs .c-program-list .is-unbroadcasted .c-program-progress__line {
  border-color: #228B22;
}
body.p-programs .c-program-list .is-unbroadcasted .c-program-progress__point {
  background-color: #228B22;
}
`;
  var head = document.querySelector('head');
  if (head) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }
}) ();
// -----
(function () {
  // 放送予定の表示範囲設定
  document.body.addEventListener('load', showProgramEvent, true);
  //$('div.c-load-more-button') [0].firstChild.addEventListener('click', showProgramEvent, true);
  /*
  //var script = document.createElement('script');
  //script.type = 'text/javascript';
  //script.appendChild(document.createTextNode('showProgramEvent();'));
  //document.body.appendChild(script);
  //console.info(script);
  */
  function getHiddenMsecAndCreateTimeSelector() { // 放送予定の表示範囲セレクター
    var time_select = $('#a-time-selector') [0];
    //console.info(time_select);
    if (!time_select) {
      var selector_parent = $('select.custom-select') [0].parentNode;
      //console.info(selector_parent);
      if (selector_parent) {
        selector_parent.appendChild(document.createTextNode(' '));
        //
        time_select = document.createElement('select');
        time_select.id = 'a-time-selector';
        time_select.className = 'custom-select';
        time_select.addEventListener('change', showProgramEvent, true);
        selector_parent.appendChild(time_select);
        //
        time_select.appendChild(createOptionItem('放送済みのみ', 0, false));
        time_select.appendChild(createOptionItem('12時間以内まで', 12 * 60 * 60 * 1000, true));
        time_select.appendChild(createOptionItem('1日(24時間)まで', 24 * 60 * 60 * 1000, false));
        time_select.appendChild(createOptionItem('2日(48時間)まで', 48 * 60 * 60 * 1000, false));
        time_select.appendChild(createOptionItem('3日(72時間)まで', 72 * 60 * 60 * 1000, false));
        //time_select.appendChild(createOptionItem('1週間', 7 * 24 * 60 * 60 * 1000, false));
        time_select.appendChild(createOptionItem('すべて', - 1, false));
      }
    }
    return time_select.value;
  }
  function createOptionItem(name, value, selected) { // セレクターの選択肢作成
    var opt = document.createElement('option');
    opt.textContent = name;
    opt.setAttribute('value', value);
    if (selected) opt.setAttribute('selected', 'selected');
    return opt;
  }
  function showProgramEvent() { // 放送予定の表示設定
    var hidden_msec = getHiddenMsecAndCreateTimeSelector(); // 12 * 60 * 60 * 1000;
    //console.info(hidden_msec);
    var now_dt = new Date();
    // 非表示とする放送予定の時刻(通算ミリ秒, now_dt.getTime() + 12 * 60 * 60 * 1000 で現在時刻より12時間前)
    var hidden_dt = hidden_msec >= 0 ? new Date(now_dt.getTime() + hidden_msec * 1)  : new Date('2099/12/31 23:59:59.999');
    //console.info(hidden_dt);
    var past_dt = hidden_msec >= 0 ? new Date(now_dt.getTime() - 365 * 24 * 60 * 60 * 1000)  : new Date(0);
    // 放送中と判断する時刻(通算ミリ秒, now_dt.getTime() - 30 * 60 * 1000 で現在時刻より30分前)
    var before_dt = new Date(now_dt.getTime() - 30 * 60 * 1000);
    // ---------- ----------
    $('div.c-card>div.row').each(function () {
      var started_at = $(this).find('span.mr-zp5') [0];
      //console.info(started_at);
      this.style.display = '';
      var started_at_obj = new Date(started_at.textContent);
      // 指定範囲外の非表示
      if (started_at_obj > hidden_dt) this.style.display = 'none';
      if (started_at_obj < past_dt) this.style.display = 'none';
      // 放送中の表示
      if (now_dt > started_at_obj && started_at_obj > before_dt) {
        $(this).find('div.a-line') [0].style = 'border-color: #87CEEB';
        $(this).find('div.a-point') [0].style = 'background-color: #87CEEB';
      }
    });
  }
}) ();
