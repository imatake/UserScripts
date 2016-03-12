// ==UserScript==
// @name        Annict 放送予定仕切
// @description Annict の放送予定ページで既に放送済みと予定のエピソードに仕切り線を入れます。
// @namespace   imatake.github.io
// @include     https://annict.com/programs
// @author      imatake
// @version     1.00.20160310
// @license     MIT License
// @icon        data:image/gif;base64,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
// @grant       none
// ==/UserScript==
(function (doc) {
  // ページロード後のイベントで処理
  // Infinite Scroll とかどうしようか…
  doc.body.addEventListener('load', function (e) {
    var now_dt = new Date();
    var prev_hr = null;
    var last_hr = null;
    $('div.program').each(function () {
      //console.info(this);
      // 各エピソードの放送開始時刻を取得し、日時オブジェクトへ
      // もう少しいい方法がないか。開始時刻の取り方とか、オブジェクトにする方法とか
      var started_at_str = this.children[0].children[1].children[2].children[1].textContent;
      var started_at = new Date('2016/' + started_at_str.replace(' ~', '').replace('再', ''));
      //console.info('started_at: ' + started_at_str + ' -> ' + started_at);
      // 放送前のエピソードの水平線を残す
      var hr = this.children[1];
      if (started_at > now_dt) prev_hr = hr;
      last_hr = hr;
    });
    // 最後の放送予定の水平線のスタイルを変更する
    if (prev_hr != null && prev_hr != last_hr) prev_hr.style = 'background-color: red; height: 2px;';
  }, true);
}) (document);
